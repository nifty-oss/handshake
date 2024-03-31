use bytemuck::{Pod, Zeroable};
use shank::{ShankAccount, ShankType};
use solana_program::pubkey::{Pubkey, PubkeyError};

#[derive(Clone, Copy, ShankType)]
/// Account discriminator.
#[derive(Default)]
pub enum Discriminator {
    /// Account not initialized.
    #[default]
    Uninitialized,

    /// Handshake account.
    Handshake,
}

unsafe impl Pod for Discriminator {}

unsafe impl Zeroable for Discriminator {}

/// The handshake account.
///
/// This account stores the information for transferring the authority from the source
/// to the target.
#[repr(C)]
#[derive(Clone, Copy, Pod, Zeroable, ShankAccount)]
pub struct Handshake {
    /// Account discriminator.
    pub discriminator: Discriminator,

    /// Derivation bump.
    pub bump: u8,

    /// Asset account.
    pub asset: Pubkey,

    /// Source authority.
    pub source: Pubkey,

    /// Target authroity.
    pub target: Pubkey,

    /// Address to received the storage fee funds.
    ///
    /// The rent amount will be returned to this address once the PDA is closed.
    pub recipient: Pubkey,
}

impl Handshake {
    pub const LEN: usize = std::mem::size_of::<Handshake>();

    pub const PREFIX: &'static [u8] = b"handshake";

    #[inline(always)]
    pub fn find_pda(asset: &Pubkey) -> (Pubkey, u8) {
        Pubkey::find_program_address(&[Handshake::PREFIX, asset.as_ref()], &crate::ID)
    }

    #[inline(always)]
    pub fn create_pda(asset: &Pubkey, bump: u8) -> Result<Pubkey, PubkeyError> {
        Pubkey::create_program_address(&[Handshake::PREFIX, asset.as_ref(), &[bump]], &crate::ID)
    }

    #[inline(always)]
    pub fn load(data: &[u8]) -> &Self {
        bytemuck::from_bytes(data)
    }

    #[inline(always)]
    pub fn load_mut(data: &mut [u8]) -> &mut Self {
        bytemuck::from_bytes_mut(data)
    }
}
