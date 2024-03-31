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

export type CancelInstruction<
  TProgram extends string = typeof HANDSHAKE_PROGRAM_ADDRESS,
  TAccountHandshake extends string | IAccountMeta<string> = string,
  TAccountAsset extends string | IAccountMeta<string> = string,
  TAccountAuthority extends string | IAccountMeta<string> = string,
  TAccountRecipient extends string | IAccountMeta<string> = string,
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
      TAccountRecipient extends string
        ? WritableAccount<TAccountRecipient>
        : TAccountRecipient,
      TAccountNiftyAssetProgram extends string
        ? ReadonlyAccount<TAccountNiftyAssetProgram>
        : TAccountNiftyAssetProgram,
      ...TRemainingAccounts,
    ]
  >;

export type CancelInstructionData = { discriminator: number };

export type CancelInstructionDataArgs = {};

export function getCancelInstructionDataEncoder(): Encoder<CancelInstructionDataArgs> {
  return mapEncoder(
    getStructEncoder([['discriminator', getU8Encoder()]]),
    (value) => ({ ...value, discriminator: 1 })
  );
}

export function getCancelInstructionDataDecoder(): Decoder<CancelInstructionData> {
  return getStructDecoder([['discriminator', getU8Decoder()]]);
}

export function getCancelInstructionDataCodec(): Codec<
  CancelInstructionDataArgs,
  CancelInstructionData
> {
  return combineCodec(
    getCancelInstructionDataEncoder(),
    getCancelInstructionDataDecoder()
  );
}

export type CancelAsyncInput<
  TAccountHandshake extends string = string,
  TAccountAsset extends string = string,
  TAccountAuthority extends string = string,
  TAccountRecipient extends string = string,
  TAccountNiftyAssetProgram extends string = string,
> = {
  /** Handshake account */
  handshake?: Address<TAccountHandshake>;
  /** Asset account */
  asset: Address<TAccountAsset>;
  /** The current authority of the asset (source) */
  authority: TransactionSigner<TAccountAuthority>;
  /** The account to receive the funds of storage fees */
  recipient: Address<TAccountRecipient>;
  /** The nifty asset program */
  niftyAssetProgram?: Address<TAccountNiftyAssetProgram>;
};

export async function getCancelInstructionAsync<
  TAccountHandshake extends string,
  TAccountAsset extends string,
  TAccountAuthority extends string,
  TAccountRecipient extends string,
  TAccountNiftyAssetProgram extends string,
>(
  input: CancelAsyncInput<
    TAccountHandshake,
    TAccountAsset,
    TAccountAuthority,
    TAccountRecipient,
    TAccountNiftyAssetProgram
  >
): Promise<
  CancelInstruction<
    typeof HANDSHAKE_PROGRAM_ADDRESS,
    TAccountHandshake,
    TAccountAsset,
    TAccountAuthority,
    TAccountRecipient,
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
    recipient: { value: input.recipient ?? null, isWritable: true },
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
      getAccountMeta(accounts.recipient),
      getAccountMeta(accounts.niftyAssetProgram),
    ],
    programAddress,
    data: getCancelInstructionDataEncoder().encode({}),
  } as CancelInstruction<
    typeof HANDSHAKE_PROGRAM_ADDRESS,
    TAccountHandshake,
    TAccountAsset,
    TAccountAuthority,
    TAccountRecipient,
    TAccountNiftyAssetProgram
  >;

  return instruction;
}

export type CancelInput<
  TAccountHandshake extends string = string,
  TAccountAsset extends string = string,
  TAccountAuthority extends string = string,
  TAccountRecipient extends string = string,
  TAccountNiftyAssetProgram extends string = string,
> = {
  /** Handshake account */
  handshake: Address<TAccountHandshake>;
  /** Asset account */
  asset: Address<TAccountAsset>;
  /** The current authority of the asset (source) */
  authority: TransactionSigner<TAccountAuthority>;
  /** The account to receive the funds of storage fees */
  recipient: Address<TAccountRecipient>;
  /** The nifty asset program */
  niftyAssetProgram?: Address<TAccountNiftyAssetProgram>;
};

export function getCancelInstruction<
  TAccountHandshake extends string,
  TAccountAsset extends string,
  TAccountAuthority extends string,
  TAccountRecipient extends string,
  TAccountNiftyAssetProgram extends string,
>(
  input: CancelInput<
    TAccountHandshake,
    TAccountAsset,
    TAccountAuthority,
    TAccountRecipient,
    TAccountNiftyAssetProgram
  >
): CancelInstruction<
  typeof HANDSHAKE_PROGRAM_ADDRESS,
  TAccountHandshake,
  TAccountAsset,
  TAccountAuthority,
  TAccountRecipient,
  TAccountNiftyAssetProgram
> {
  // Program address.
  const programAddress = HANDSHAKE_PROGRAM_ADDRESS;

  // Original accounts.
  const originalAccounts = {
    handshake: { value: input.handshake ?? null, isWritable: true },
    asset: { value: input.asset ?? null, isWritable: true },
    authority: { value: input.authority ?? null, isWritable: false },
    recipient: { value: input.recipient ?? null, isWritable: true },
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
      getAccountMeta(accounts.recipient),
      getAccountMeta(accounts.niftyAssetProgram),
    ],
    programAddress,
    data: getCancelInstructionDataEncoder().encode({}),
  } as CancelInstruction<
    typeof HANDSHAKE_PROGRAM_ADDRESS,
    TAccountHandshake,
    TAccountAsset,
    TAccountAuthority,
    TAccountRecipient,
    TAccountNiftyAssetProgram
  >;

  return instruction;
}

export type ParsedCancelInstruction<
  TProgram extends string = typeof HANDSHAKE_PROGRAM_ADDRESS,
  TAccountMetas extends readonly IAccountMeta[] = readonly IAccountMeta[],
> = {
  programAddress: Address<TProgram>;
  accounts: {
    /** Handshake account */
    handshake: TAccountMetas[0];
    /** Asset account */
    asset: TAccountMetas[1];
    /** The current authority of the asset (source) */
    authority: TAccountMetas[2];
    /** The account to receive the funds of storage fees */
    recipient: TAccountMetas[3];
    /** The nifty asset program */
    niftyAssetProgram: TAccountMetas[4];
  };
  data: CancelInstructionData;
};

export function parseCancelInstruction<
  TProgram extends string,
  TAccountMetas extends readonly IAccountMeta[],
>(
  instruction: IInstruction<TProgram> &
    IInstructionWithAccounts<TAccountMetas> &
    IInstructionWithData<Uint8Array>
): ParsedCancelInstruction<TProgram, TAccountMetas> {
  if (instruction.accounts.length < 5) {
    // TODO: Coded error.
    throw new Error('Not enough accounts');
  }
  let accountIndex = 0;
  const getNextAccount = () => {
    const accountMeta = instruction.accounts![accountIndex]!;
    accountIndex += 1;
    return accountMeta;
  };
  return {
    programAddress: instruction.programAddress,
    accounts: {
      handshake: getNextAccount(),
      asset: getNextAccount(),
      authority: getNextAccount(),
      recipient: getNextAccount(),
      niftyAssetProgram: getNextAccount(),
    },
    data: getCancelInstructionDataDecoder().decode(instruction.data),
  };
}