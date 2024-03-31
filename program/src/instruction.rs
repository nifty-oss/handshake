use borsh::{BorshDeserialize, BorshSerialize};
use shank::{ShankContext, ShankInstruction};

#[derive(BorshDeserialize, BorshSerialize, Clone, Debug, ShankContext, ShankInstruction)]
#[rustfmt::skip]
pub enum Instruction {
    /// Accepts the transfer of authority.
    #[account(0, writable, name="handshake", desc = "Handshake account")]
    #[account(1, writable, name="asset", desc = "Asset account")]
    #[account(2, signer, name="authority", desc = "The address to transfer the authority to (target)")]
    #[account(3, writable, name="recipient", desc = "The account to receive the funds of storage fees")]
    #[account(4, name="nifty_asset_program", desc = "The nifty asset program")]
    Accept,

    /// Cancels the transfer of authority.
    #[account(0, writable, name="handshake", desc = "Handshake account")]
    #[account(1, writable, name="asset", desc = "Asset account")]
    #[account(2, signer, name="authority", desc = "The current authority of the asset (source)")]
    #[account(3, writable, name="recipient", desc = "The account to receive the funds of storage fees")]
    #[account(4, name="nifty_asset_program", desc = "The nifty asset program")]
    Cancel,

    /// Initiates the transfer of authority for an asset.
    #[account(0, writable, name="handshake", desc = "The program derived address of the handshake account (seeds: ['handshake', asset])")]
    #[account(1, writable, name="asset", desc = "Asset account")]
    #[account(2, signer, name="authority", desc = "The current authority of the asset")]
    #[account(3, name="target", desc = "The address to transfer the authority to")]
    #[account(4, optional, name="payer", desc = "The account paying for the storage fees")]
    #[account(5, optional, name="system_program", desc = "The system program")]
    #[account(6, name="nifty_asset_program", desc = "The nifty asset program")]
    Initiate,
}
