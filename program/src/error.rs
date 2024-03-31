use num_derive::FromPrimitive;
use solana_program::{
    decode_error::DecodeError,
    msg,
    program_error::{PrintProgramError, ProgramError},
};
use thiserror::Error;

#[derive(Error, Clone, Debug, Eq, PartialEq, FromPrimitive)]
pub enum Error {
    /// 0 - Invalid account length
    #[error("Invalid account length")]
    InvalidAccountLength,

    /// 1 - Asset already initialized
    #[error("Asset already initialized")]
    AlreadyInitialized,

    /// 2 - Pubkey mismatch
    #[error("Pubkey mismatch")]
    PubkeyMismatch,
}

impl PrintProgramError for Error {
    fn print<E>(&self) {
        msg!("⛔️ {} ({:?})", &self.to_string(), &self);
    }
}

impl From<Error> for ProgramError {
    fn from(e: Error) -> Self {
        ProgramError::Custom(e as u32)
    }
}

impl<T> DecodeError<T> for Error {
    fn type_of() -> &'static str {
        "nifty::handshake"
    }
}

#[macro_export]
macro_rules! err {
    ( $error:expr ) => {{
        Err($error.into())
    }};
    ( $error:expr, $msg:expr ) => {{
        solana_program::msg!("[ERROR] {}", $msg);
        Err($error.into())
    }};
    ( $error:expr, $msg:literal, $($args:tt)+ ) => {{
        err!($error, &format!($msg, $($args)+))
    }};
}
