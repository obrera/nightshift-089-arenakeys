import { Check, Circle, ExternalLink, ShieldAlert } from 'lucide-react'

import { Button } from '@/core/ui/button'

import type { ArenaKeyMintProof } from '../data-access/use-arenakeys-proof-signature'

export function ArenaKeysUiReadinessPanel({
  checks,
  isSigning,
  mintReady,
  proof,
  signDevnetProof,
}: {
  checks: { label: string; passed: boolean }[]
  isSigning: boolean
  mintReady: boolean
  proof: ArenaKeyMintProof | undefined
  signDevnetProof: () => Promise<ArenaKeyMintProof | undefined>
}) {
  return (
    <section className="grid gap-4 border border-white/10 bg-zinc-950/80 p-5 lg:grid-cols-[1fr_auto]">
      <div>
        <div className="flex items-center gap-2 text-white">
          <ShieldAlert size={20} />
          <h2 className="text-lg font-semibold">Holder Readiness</h2>
        </div>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {checks.map((check) => (
            <div
              className="flex items-center gap-2 border border-white/10 bg-black/35 px-3 py-2 text-sm"
              key={check.label}
            >
              {check.passed ? (
                <Check className="text-emerald-300" size={16} />
              ) : (
                <Circle className="text-zinc-600" size={16} />
              )}
              <span className={check.passed ? 'text-zinc-100' : 'text-zinc-500'}>{check.label}</span>
            </div>
          ))}
        </div>
        {proof ? (
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <a
              className="inline-flex items-center gap-2 text-cyan-200 underline-offset-4 hover:underline"
              href={`https://explorer.solana.com/address/${proof.assetAddress}?cluster=devnet`}
              rel="noreferrer"
              target="_blank"
            >
              NFT {proof.assetAddress.slice(0, 10)}...{proof.assetAddress.slice(-8)}
              <ExternalLink size={14} />
            </a>
            <a
              className="inline-flex items-center gap-2 text-emerald-200 underline-offset-4 hover:underline"
              href={`https://explorer.solana.com/tx/${proof.signature}?cluster=devnet`}
              rel="noreferrer"
              target="_blank"
            >
              tx {proof.signature.slice(0, 10)}...{proof.signature.slice(-8)}
              <ExternalLink size={14} />
            </a>
          </div>
        ) : null}
      </div>
      <Button className="self-end rounded-sm" disabled={!mintReady || isSigning} onClick={() => void signDevnetProof()}>
        {isSigning ? 'Minting ArenaKey' : 'Mint devnet ArenaKey'}
      </Button>
    </section>
  )
}
