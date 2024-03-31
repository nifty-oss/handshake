use nifty_asset::instructions::HandoverCpiBuilder;
use solana_program::{entrypoint::ProgramResult, program_error::ProgramError, pubkey::Pubkey};

use crate::{
    error::Error,
    instruction::accounts::{AcceptAccounts, Context},
    processor::close_program_account,
    require,
    state::{Discriminator, Handshake},
};

pub type TransferAccounts<'a> = AcceptAccounts<'a>;

/// Indicates the action to take on the handshake.
pub enum Action {
    Accept,
    Cancel,
}

/// Transfers the authority to:
///
///   - `source`: if the handshake is cancelled
///   - `target`: if the handshake is accepted
///
/// ### Accounts:
///
///   0. `[writable]` handshake
///   1. `[writable]` asset
///   2. `[signer]` authority (source or target)
///   3. `[writable]` recipient
///   4. `[]` nifty_asset_program
pub fn process_transfer(
    program_id: &Pubkey,
    ctx: Context<TransferAccounts>,
    action: Action,
) -> ProgramResult {
    // account validation (asset account will be validated on the CPI)

    require!(
        ctx.accounts.authority.is_signer,
        ProgramError::MissingRequiredSignature,
        "authority"
    );

    require!(
        ctx.accounts.handshake.owner == program_id,
        ProgramError::IllegalOwner,
        "handshake"
    );

    let data = (*ctx.accounts.handshake.data).borrow();

    require!(
        data.len() >= Handshake::LEN && data[0] == Discriminator::Handshake as u8,
        ProgramError::UninitializedAccount,
        "handshake"
    );

    let handshake = Handshake::load(&data);
    let derived_key = Handshake::create_pda(&handshake.asset, handshake.bump)?;

    require!(
        derived_key == *ctx.accounts.handshake.key,
        ProgramError::InvalidSeeds,
        "handshake account does not match derived key"
    );

    match action {
        Action::Accept => {
            require!(
                handshake.target == *ctx.accounts.authority.key,
                Error::PubkeyMismatch,
                "authority does not match handshake target"
            );
        }
        Action::Cancel => {
            require!(
                handshake.source == *ctx.accounts.authority.key,
                Error::PubkeyMismatch,
                "authority does not match handshake source"
            );
        }
    }

    require!(
        handshake.recipient == *ctx.accounts.recipient.key,
        Error::PubkeyMismatch,
        "recipient does not match handshake source"
    );

    let signer_seeds = &[ctx.accounts.handshake.key.as_ref(), &[handshake.bump]];
    // drop the data for the CPI
    drop(data);

    // cancel the transfer of authority and close the PDA

    HandoverCpiBuilder::new(ctx.accounts.nifty_asset_program)
        .asset(ctx.accounts.asset)
        .authority(ctx.accounts.handshake)
        .new_authority(ctx.accounts.authority)
        .invoke_signed(&[signer_seeds])?;

    close_program_account(ctx.accounts.handshake, ctx.accounts.recipient)
}
