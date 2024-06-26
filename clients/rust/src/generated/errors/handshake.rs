//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use num_derive::FromPrimitive;
use thiserror::Error;

#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum HandshakeError {
    /// 0 (0x0) - Invalid account length
    #[error("Invalid account length")]
    InvalidAccountLength,
    /// 1 (0x1) - Asset already initialized
    #[error("Asset already initialized")]
    AlreadyInitialized,
    /// 2 (0x2) - Pubkey mismatch
    #[error("Pubkey mismatch")]
    PubkeyMismatch,
}

impl solana_program::program_error::PrintProgramError for HandshakeError {
    fn print<E>(&self) {
        solana_program::msg!(&self.to_string());
    }
}
