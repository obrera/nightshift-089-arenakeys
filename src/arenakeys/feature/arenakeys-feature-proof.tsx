import type { UiWalletAccount } from '@wallet-ui/react'

import { toast } from 'sonner'

import type { ArenaKeyMetadata } from '../util/arenakeys-domain'

import { useArenaKeysProofSignature } from '../data-access/use-arenakeys-proof-signature'
import { ArenaKeysUiReadinessPanel } from '../ui/arenakeys-ui-readiness-panel'

export function ArenaKeysFeatureProof({
  account,
  checks,
  metadata,
  mintReady,
}: {
  account: UiWalletAccount | undefined
  checks: { label: string; passed: boolean }[]
  metadata: ArenaKeyMetadata
  mintReady: boolean
}) {
  if (!account) {
    return (
      <ArenaKeysUiReadinessPanel
        checks={checks}
        isSigning={false}
        mintReady={false}
        proof={undefined}
        signDevnetProof={async () => {
          toast.error('Connect a wallet before minting the ArenaKey.')
          return undefined
        }}
      />
    )
  }

  return <ArenaKeysFeatureConnectedProof account={account} checks={checks} metadata={metadata} mintReady={mintReady} />
}

function ArenaKeysFeatureConnectedProof({
  account,
  checks,
  metadata,
  mintReady,
}: {
  account: UiWalletAccount
  checks: { label: string; passed: boolean }[]
  metadata: ArenaKeyMetadata
  mintReady: boolean
}) {
  const proof = useArenaKeysProofSignature({ account, metadata })

  async function signDevnetProof() {
    try {
      const mintProof = await proof.signDevnetProof()
      toast.success('ArenaKey NFT minted on devnet.')

      return mintProof
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error))
      return undefined
    }
  }

  return (
    <ArenaKeysUiReadinessPanel
      checks={checks}
      isSigning={proof.isSigning}
      mintReady={mintReady}
      proof={proof.proof}
      signDevnetProof={signDevnetProof}
    />
  )
}
