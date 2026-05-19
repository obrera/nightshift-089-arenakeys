import { useWalletUi } from '@wallet-ui/react'

import type { ArenaKeyMetadata } from '../util/arenakeys-domain'

export function useArenaKeysReadiness(metadata: ArenaKeyMetadata) {
  const { account, cluster, connected } = useWalletUi()
  const walletReady = connected && Boolean(account)
  const devnetReady = cluster.id === 'solana:devnet'
  const holderVerified = walletReady && metadata.readinessScore >= 62
  const mintReady = walletReady && devnetReady && holderVerified

  return {
    account,
    checks: [
      { label: 'Wallet connected', passed: walletReady },
      { label: 'Devnet selected', passed: devnetReady },
      { label: 'Holder readiness verified', passed: holderVerified },
      { label: 'MPL Core proof path unlocked', passed: mintReady },
    ],
    cluster,
    holderVerified,
    mintReady,
  }
}
