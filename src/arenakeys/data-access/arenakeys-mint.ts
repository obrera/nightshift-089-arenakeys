import type { Address, TransactionSigner } from '@solana/kit'

import { getCreateV1Instruction } from '@obrera/mpl-core-kit-lib/generated'

import type { ArenaKeyMetadata } from '../util/arenakeys-domain'

export function getArenaKeyCreateInstruction({
  asset,
  metadata,
  owner,
  payer,
}: {
  asset: TransactionSigner
  metadata: ArenaKeyMetadata
  owner?: Address
  payer: TransactionSigner
}) {
  return getCreateV1Instruction({
    asset,
    authority: payer,
    name: metadata.name,
    owner: owner ?? payer.address,
    payer,
    updateAuthority: payer.address,
    uri: metadata.uri,
  })
}
