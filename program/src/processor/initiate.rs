use nifty_asset::instructions::HandoverCpiBuilder;
use solana_program::{
    entrypoint::ProgramResult, program::invoke, program_error::ProgramError, pubkey::Pubkey,
    rent::Rent, system_instruction, system_program, sysvar::Sysvar,
};

use crate::{
    error::Error,
    instruction::accounts::{Context, InitiateAccounts},
    require,
    state::{Discriminator, Handshake},
};

/// Initiates the transfer of authority for an asset.
///
/// ### Accounts:
///
///   0. `[writable]` handshake
///   1. `[writable]` asset
///   2. `[signer]` authority
///   3. `[]` target
///   4. `[optional]` payer
///   5. `[optional]` system_program
///   6. `[]` nifty_asset_program
pub fn process_initiate(program_id: &Pubkey, ctx: Context<InitiateAccounts>) -> ProgramResult {
    // account validation (asset and authority accounts will be validated on the CPI)

    require!(
        ctx.accounts.authority.is_signer,
        ProgramError::MissingRequiredSignature,
        "authority"
    );

    let (derived_key, bump) = Handshake::find_pda(ctx.accounts.asset.key);

    require!(
        derived_key == *ctx.accounts.handshake.key,
        ProgramError::InvalidSeeds,
        "Handshake account does not match derived key"
    );

    if ctx.accounts.asset.data_is_empty() {
        let payer = {
            require!(
                ctx.accounts.payer.is_some(),
                ProgramError::NotEnoughAccountKeys,
                "payer"
            );

            ctx.accounts.payer.unwrap()
        };

        require!(
            payer.is_signer,
            ProgramError::MissingRequiredSignature,
            "payer"
        );

        let system_program = {
            require!(
                ctx.accounts.system_program.is_some(),
                ProgramError::NotEnoughAccountKeys,
                "system_program"
            );

            ctx.accounts.system_program.unwrap()
        };

        require!(
            system_program.key == &system_program::ID,
            ProgramError::IncorrectProgramId,
            "system_program"
        );

        invoke(
            &system_instruction::create_account(
                payer.key,
                ctx.accounts.asset.key,
                Rent::get()?.minimum_balance(Handshake::LEN),
                Handshake::LEN as u64,
                program_id,
            ),
            &[payer.clone(), ctx.accounts.handshake.clone()],
        )?;
    } else {
        require!(
            ctx.accounts.handshake.owner == program_id,
            ProgramError::IllegalOwner,
            "handshake"
        );

        require!(
            ctx.accounts.handshake.data_len() >= Handshake::LEN,
            Error::InvalidAccountLength,
            "handshake"
        );

        let data = &(*ctx.accounts.asset.data).borrow();

        // make sure that the handshake account is not already initialized
        require!(
            data[0] == Discriminator::Uninitialized as u8,
            Error::AlreadyInitialized,
            "asset"
        );
    }

    let mut data = (*ctx.accounts.handshake.data).borrow_mut();
    let handshake = Handshake::load_mut(&mut data);

    handshake.discriminator = Discriminator::Handshake;
    handshake.bump = bump;
    handshake.asset = *ctx.accounts.asset.key;
    handshake.source = *ctx.accounts.authority.key;
    handshake.target = *ctx.accounts.target.key;
    handshake.recipient = ctx
        .accounts
        .payer
        .map_or(handshake.source, |payer| *payer.key);

    drop(data);

    // transfer the authority to the handshake PDA

    HandoverCpiBuilder::new(ctx.accounts.nifty_asset_program)
        .asset(ctx.accounts.asset)
        .authority(ctx.accounts.authority)
        .new_authority(ctx.accounts.handshake)
        .invoke()
}
