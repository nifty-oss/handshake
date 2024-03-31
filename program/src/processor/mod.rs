mod initiate;
mod transfer;

use borsh::BorshDeserialize;
use solana_program::{
    account_info::AccountInfo, entrypoint::ProgramResult, msg, program_error::ProgramError,
    pubkey::Pubkey, system_program,
};

use crate::{
    instruction::{accounts::InitiateAccounts, Instruction},
    processor::transfer::{Action, TransferAccounts},
};

pub fn process_instruction<'a>(
    program_id: &Pubkey,
    accounts: &'a [AccountInfo<'a>],
    instruction_data: &[u8],
) -> ProgramResult {
    let instruction: Instruction = Instruction::try_from_slice(instruction_data)
        .map_err(|_| ProgramError::InvalidInstructionData)?;

    match instruction {
        Instruction::Accept => {
            msg!("Instruction: Accept");
            transfer::process_transfer(
                program_id,
                TransferAccounts::context(accounts)?,
                Action::Accept,
            )
        }
        Instruction::Cancel => {
            msg!("Instruction: Cancel");
            transfer::process_transfer(
                program_id,
                TransferAccounts::context(accounts)?,
                Action::Cancel,
            )
        }
        Instruction::Initiate => {
            msg!("Instruction: Initiate");
            initiate::process_initiate(program_id, InitiateAccounts::context(accounts)?)
        }
    }
}

#[inline(always)]
pub fn close_program_account<'a>(
    account_info: &AccountInfo<'a>,
    recipient_info: &AccountInfo<'a>,
) -> ProgramResult {
    // Transfer lamports from the account to the destination account.
    let dest_starting_lamports = recipient_info.lamports();
    **recipient_info.lamports.borrow_mut() = dest_starting_lamports
        .checked_add(account_info.lamports())
        .unwrap();
    **account_info.lamports.borrow_mut() = 0;

    // Realloc the account data size to 0 bytes and re-assign ownership of
    // the account to the system program.
    account_info.realloc(0, false)?;
    account_info.assign(&system_program::ID);

    Ok(())
}

#[macro_export]
macro_rules! require {
    ( $constraint:expr, $error:expr, $message:expr ) => {
        if !$constraint {
            solana_program::msg!("Constraint failed: {}", $message);
            return Err($error.into());
        }
    };
    ( $constraint:expr, $error:expr, $message:literal, $($args:tt)+ ) => {
        require!( $constraint, $error, format!($message, $($args)+) );
    };
}
