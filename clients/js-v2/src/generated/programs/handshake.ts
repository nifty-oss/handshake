/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Address } from '@solana/addresses';
import { getU8Encoder } from '@solana/codecs';
import { Program, ProgramWithErrors } from '@solana/programs';
import {
  HandshakeProgramError,
  HandshakeProgramErrorCode,
  getHandshakeProgramErrorFromCode,
} from '../errors';
import {
  ParsedAcceptInstruction,
  ParsedCancelInstruction,
  ParsedInitiateInstruction,
} from '../instructions';
import { memcmp } from '../shared';

export const HANDSHAKE_PROGRAM_ADDRESS =
  'HndshkSZWu1f4qdwyACwsP8YoBxvCzb7NNVB1Aj3w656' as Address<'HndshkSZWu1f4qdwyACwsP8YoBxvCzb7NNVB1Aj3w656'>;

export type HandshakeProgram =
  Program<'HndshkSZWu1f4qdwyACwsP8YoBxvCzb7NNVB1Aj3w656'> &
    ProgramWithErrors<HandshakeProgramErrorCode, HandshakeProgramError>;

export function getHandshakeProgram(): HandshakeProgram {
  return {
    name: 'handshake',
    address: HANDSHAKE_PROGRAM_ADDRESS,
    getErrorFromCode(code: HandshakeProgramErrorCode, cause?: Error) {
      return getHandshakeProgramErrorFromCode(code, cause);
    },
  };
}

export enum HandshakeAccount {
  Handshake,
}

export enum HandshakeInstruction {
  Accept,
  Cancel,
  Initiate,
}

export function identifyHandshakeInstruction(
  instruction: { data: Uint8Array } | Uint8Array
): HandshakeInstruction {
  const data =
    instruction instanceof Uint8Array ? instruction : instruction.data;
  if (memcmp(data, getU8Encoder().encode(0), 0)) {
    return HandshakeInstruction.Accept;
  }
  if (memcmp(data, getU8Encoder().encode(1), 0)) {
    return HandshakeInstruction.Cancel;
  }
  if (memcmp(data, getU8Encoder().encode(2), 0)) {
    return HandshakeInstruction.Initiate;
  }
  throw new Error(
    'The provided instruction could not be identified as a handshake instruction.'
  );
}

export type ParsedHandshakeInstruction<
  TProgram extends string = 'HndshkSZWu1f4qdwyACwsP8YoBxvCzb7NNVB1Aj3w656',
> =
  | ({
      instructionType: HandshakeInstruction.Accept;
    } & ParsedAcceptInstruction<TProgram>)
  | ({
      instructionType: HandshakeInstruction.Cancel;
    } & ParsedCancelInstruction<TProgram>)
  | ({
      instructionType: HandshakeInstruction.Initiate;
    } & ParsedInitiateInstruction<TProgram>);