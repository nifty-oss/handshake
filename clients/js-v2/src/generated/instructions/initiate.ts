/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Address } from '@solana/addresses';
import {
  Codec,
  Decoder,
  Encoder,
  combineCodec,
  getStructDecoder,
  getStructEncoder,
  getU8Decoder,
  getU8Encoder,
  mapEncoder,
} from '@solana/codecs';
import {
  IAccountMeta,
  IInstruction,
  IInstructionWithAccounts,
  IInstructionWithData,
  ReadonlyAccount,
  ReadonlySignerAccount,
  WritableAccount,
} from '@solana/instructions';
import { IAccountSignerMeta, TransactionSigner } from '@solana/signers';
import { findHandshakePda } from '../pdas';
import { HANDSHAKE_PROGRAM_ADDRESS } from '../programs';
import {
  ResolvedAccount,
  expectAddress,
  getAccountMetaFactory,
} from '../shared';

export type InitiateInstruction<
  TProgram extends string = typeof HANDSHAKE_PROGRAM_ADDRESS,
  TAccountHandshake extends string | IAccountMeta<string> = string,
  TAccountAsset extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountTarget extends string | IAccountMeta<string> = string,
  TAccountPayer extends string | IAccountMeta<string> = string,
  TAccountSystemProgram extends string | IAccountMeta<string> = string,
  TAccountNiftyAssetProgram extends
    | string
    | IAccountMeta<string> = 'AssetGtQBTSgm5s91d1RAQod5JmaZiJDxqsgtqrZud73',
  TRemainingAccounts extends readonly IAccountMeta<string>[] = [],
> = IInstruction<TProgram> &
  IInstructionWithData<Uint8Array> &
  IInstructionWithAccounts<
    [
      TAccountHandshake extends string
        ? WritableAccount<TAccountHandshake>
        : TAccountHandshake,
      TAccountAsset extends string
        ? WritableAccount<TAccountAsset>
        : TAccountAsset,
      TAccountAuthority extends string
        ? ReadonlySignerAccount<TAccountAuthority> &
            IAccountSignerMeta<TAccountAuthority>
        : TAccountAuthority,
      TAccountTarget extends string
        ? ReadonlyAccount<TAccountTarget>
        : TAccountTarget,
      TAccountPayer extends string
        ? ReadonlyAccount<TAccountPayer>
        : TAccountPayer,
      TAccountSystemProgram extends string
        ? ReadonlyAccount<TAccountSystemProgram>
        : TAccountSystemProgram,
      TAccountNiftyAssetProgram extends string
        ? ReadonlyAccount<TAccountNiftyAssetProgram>
        : TAccountNiftyAssetProgram,
      ...TRemainingAccounts,
    ]
  >;

export type InitiateInstructionData = { discriminator: number };

export type InitiateInstructionDataArgs = {};

export function getInitiateInstructionDataEncoder(): Encoder<InitiateInstructionDataArgs> {
  return mapEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 2 })
  );
}

export function getInitiateInstructionDataDecoder(): Decoder<InitiateInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getInitiateInstructionDataCodec(): Codec<
  InitiateInstructionDataArgs,
  InitiateInstructionData
> {
  return combineCodec(
    getInitiateInstructionDataEncoder(),
    getInitiateInstructionDataDecoder()
  );
}

export type InitiateAsyncInput<
  TAccountHandshake extends string = string,
  TAccountAsset extends string = string,
  TAccountAuthority extends string = string,
  TAccountTarget extends string = string,
  TAccountPayer extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountNiftyAssetProgram extends string = string,
> = {
  /** The program derived address of the handshake account (seeds: ['handshake', asset]) */
  handshake?: Address<TAccountHandshake>;
  /** Asset account */
  asset: Address<TAccountAsset>;
  /** The current authority of the asset */
  authority: TransactionSigner<TAccountAuthority>;
  /** The address to transfer the authority to */
  target: Address<TAccountTarget>;
  /** The account paying for the storage fees */
  payer?: Address<TAccountPayer>;
  /** The system program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** The nifty asset program */
  niftyAssetProgram?: Address<TAccountNiftyAssetProgram>;
};

export async function getInitiateInstructionAsync<
  TAccountHandshake extends string,
  TAccountAsset extends string,
  TAccountAuthority extends string,
  TAccountTarget extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
  TAccountNiftyAssetProgram extends string,
>(
  input: InitiateAsyncInput<
    TAccountHandshake,
    TAccountAsset,
    TAccountAuthority,
    TAccountTarget,
    TAccountPayer,
    TAccountSystemProgram,
    TAccountNiftyAssetProgram
  >
): Promise<
  InitiateInstruction<
    typeof HANDSHAKE_PROGRAM_ADDRESS,
    TAccountHandshake,
    TAccountAsset,
    TAccountAuthority,
    TAccountTarget,
    TAccountPayer,
    TAccountSystemProgram,
    TAccountNiftyAssetProgram
  >
> {
  // Program address.
  const programAddress = HANDSHAKE_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    handshake: { value: input.handshake ?? null, isWritable: true },
    asset: { value: input.asset ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    target: { value: input.target ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    niftyAssetProgram: {
      value: input.niftyAssetProgram ?? null,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.handshake.value) {
    accounts.handshake.value = await findHandshakePda({
      asset: expectAddress(accounts.asset.value),
    });
  }
  if (!accounts.systemProgram.value) {
    if (accounts.payer.value) {
      accounts.systemProgram.value =
        '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
    }
  }
  if (!accounts.niftyAssetProgram.value) {
    accounts.niftyAssetProgram.value =
      'AssetGtQBTSgm5s91d1RAQod5JmaZiJDxqsgtqrZud73' as Address<'AssetGtQBTSgm5s91d1RAQod5JmaZiJDxqsgtqrZud73'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.handshake),
      getAccountMeta(accounts.asset),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.target),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.niftyAssetProgram),
    ],
    programAddress,
    data: getInitiateInstructionDataEncoder().encode({}),
  } as InitiateInstruction<
    typeof HANDSHAKE_PROGRAM_ADDRESS,
    TAccountHandshake,
    TAccountAsset,
    TAccountAuthority,
    TAccountTarget,
    TAccountPayer,
    TAccountSystemProgram,
    TAccountNiftyAssetProgram
  >;

  return instruction;
}

export type InitiateInput<
  TAccountHandshake extends string = string,
  TAccountAsset extends string = string,
  TAccountAuthority extends string = string,
  TAccountTarget extends string = string,
  TAccountPayer extends string = string,
  TAccountSystemProgram extends string = string,
  TAccountNiftyAssetProgram extends string = string,
> = {
  /** The program derived address of the handshake account (seeds: ['handshake', asset]) */
  handshake: Address<TAccountHandshake>;
  /** Asset account */
  asset: Address<TAccountAsset>;
  /** The current authority of the asset */
  authority: TransactionSigner<TAccountAuthority>;
  /** The address to transfer the authority to */
  target: Address<TAccountTarget>;
  /** The account paying for the storage fees */
  payer?: Address<TAccountPayer>;
  /** The system program */
  systemProgram?: Address<TAccountSystemProgram>;
  /** The nifty asset program */
  niftyAssetProgram?: Address<TAccountNiftyAssetProgram>;
};

export function getInitiateInstruction<
  TAccountHandshake extends string,
  TAccountAsset extends string,
  TAccountAuthority extends string,
  TAccountTarget extends string,
  TAccountPayer extends string,
  TAccountSystemProgram extends string,
  TAccountNiftyAssetProgram extends string,
>(
  input: InitiateInput<
    TAccountHandshake,
    TAccountAsset,
    TAccountAuthority,
    TAccountTarget,
    TAccountPayer,
    TAccountSystemProgram,
    TAccountNiftyAssetProgram
  >
): InitiateInstruction<
  typeof HANDSHAKE_PROGRAM_ADDRESS,
  TAccountHandshake,
  TAccountAsset,
  TAccountAuthority,
  TAccountTarget,
  TAccountPayer,
  TAccountSystemProgram,
  TAccountNiftyAssetProgram
> {
  // Program address.
  const programAddress = HANDSHAKE_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    handshake: { value: input.handshake ?? null, isWritable: true },
    asset: { value: input.asset ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    target: { value: input.target ?? null, isWritable: false },
    payer: { value: input.payer ?? null, isWritable: false },
    systemProgram: { value: input.systemProgram ?? null, isWritable: false },
    niftyAssetProgram: {
      value: input.niftyAssetProgram ?? null,
      isWritable: false,
    },
  };
  const accounts = originalAccounts as Record<
    keyof typeof originalAccounts,
    ResolvedAccount
  >;

  // Resolve default values.
  if (!accounts.systemProgram.value) {
    if (accounts.payer.value) {
      accounts.systemProgram.value =
        '11111111111111111111111111111111' as Address<'11111111111111111111111111111111'>;
    }
  }
  if (!accounts.niftyAssetProgram.value) {
    accounts.niftyAssetProgram.value =
      'AssetGtQBTSgm5s91d1RAQod5JmaZiJDxqsgtqrZud73' as Address<'AssetGtQBTSgm5s91d1RAQod5JmaZiJDxqsgtqrZud73'>;
  }

  const getAccountMeta = getAccountMetaFactory(programAddress, 'programId');
  const instruction = {
    accounts: [
      getAccountMeta(accounts.handshake),
      getAccountMeta(accounts.asset),
      getAccountMeta(accounts.authority),
      getAccountMeta(accounts.target),
      getAccountMeta(accounts.payer),
      getAccountMeta(accounts.systemProgram),
      getAccountMeta(accounts.niftyAssetProgram),
    ],
    programAddress,
    data: getInitiateInstructionDataEncoder().encode({}),
  } as InitiateInstruction<
    typeof HANDSHAKE_PROGRAM_ADDRESS,
    TAccountHandshake,
    TAccountAsset,
    TAccountAuthority,
    TAccountTarget,
    TAccountPayer,
    TAccountSystemProgram,
    TAccountNiftyAssetProgram
  >;

  return instruction;
}

export type ParsedInitiateInstruction<
  TProgram extends string = typeof HANDSHAKE_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** The program derived address of the handshake account (seeds: ['handshake', asset]) */
    handshake: TAccountMetas[0];
    /** Asset account */
    asset: TAccountMetas[1];
    /** The current authority of the asset */
    authority: TAccountMetas[2];
    /** The address to transfer the authority to */
    target: TAccountMetas[3];
    /** The account paying for the storage fees */
    payer?: TAccountMetas[4] | undefined;
    /** The system program */
    systemProgram?: TAccountMetas[5] | undefined;
    /** The nifty asset program */
    niftyAssetProgram: TAccountMetas[6];
  };
  data: InitiateInstructionData;
};

export function parseInitiateInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedInitiateInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 7) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  const getNextOptionalAccount = () => {
    const accountMeta = getNextAccount();
    return accountMeta.address === HANDSHAKE_PROGRAM_ADDRESS
      ? undefined
      : accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      handshake: getNextAccount(),
      asset: getNextAccount(),
      authority: getNextAccount(),
      target: getNextAccount(),
      payer: getNextOptionalAccount(),
      systemProgram: getNextOptionalAccount(),
      niftyAssetProgram: getNextAccount(),
    },
    data: getInitiateInstructionDataDecoder().decode(instruction.data),
  };
}
