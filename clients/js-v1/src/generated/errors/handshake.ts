/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Program, ProgramError } from '@metaplex-foundation/umi';

type ProgramErrorConstructor = new (
  program: Program,
  cause?: Error
) => ProgramError;
const codeToErrorMap: Map<number, ProgramErrorConstructor> = new Map();
const nameToErrorMap: Map<string, ProgramErrorConstructor> = new Map();

/** InvalidAccountLength: Invalid account length */
export class InvalidAccountLengthError extends ProgramError {
  override readonly name: string = 'InvalidAccountLength';

  readonly code: number = 0x0; // 0

  constructor(program: Program, cause?: Error) {
    super('Invalid account length', program, cause);
  }
}
codeToErrorMap.set(0x0, InvalidAccountLengthError);
nameToErrorMap.set('InvalidAccountLength', InvalidAccountLengthError);

/** AlreadyInitialized: Asset already initialized */
export class AlreadyInitializedError extends ProgramError {
  override readonly name: string = 'AlreadyInitialized';

  readonly code: number = 0x1; // 1

  constructor(program: Program, cause?: Error) {
    super('Asset already initialized', program, cause);
  }
}
codeToErrorMap.set(0x1, AlreadyInitializedError);
nameToErrorMap.set('AlreadyInitialized', AlreadyInitializedError);

/** PubkeyMismatch: Pubkey mismatch */
export class PubkeyMismatchError extends ProgramError {
  override readonly name: string = 'PubkeyMismatch';

  readonly code: number = 0x2; // 2

  constructor(program: Program, cause?: Error) {
    super('Pubkey mismatch', program, cause);
  }
}
codeToErrorMap.set(0x2, PubkeyMismatchError);
nameToErrorMap.set('PubkeyMismatch', PubkeyMismatchError);

/**
 * Attempts to resolve a custom program error from the provided error code.
 * @category Errors
 */
export function getHandshakeErrorFromCode(
  code: number,
  program: Program,
  cause?: Error
): ProgramError | null {
  const constructor = codeToErrorMap.get(code);
  return constructor ? new constructor(program, cause) : null;
}

/**
 * Attempts to resolve a custom program error from the provided error name, i.e. 'Unauthorized'.
 * @category Errors
 */
export function getHandshakeErrorFromName(
  name: string,
  program: Program,
  cause?: Error
): ProgramError | null {
  const constructor = nameToErrorMap.get(name);
  return constructor ? new constructor(program, cause) : null;
}
