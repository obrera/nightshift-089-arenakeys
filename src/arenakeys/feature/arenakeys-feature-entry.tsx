import { useMemo, useState } from 'react'

import { useArenaKeysBootstrapQuery } from '../data-access/use-arenakeys-bootstrap-query'
import { useArenaKeysReadiness } from '../data-access/use-arenakeys-readiness'
import { ArenaKeysUiArchetypeRoster } from '../ui/arenakeys-ui-archetype-roster'
import { ArenaKeysUiBossGateConfig } from '../ui/arenakeys-ui-boss-gate-config'
import { ArenaKeysUiMetadataPreview } from '../ui/arenakeys-ui-metadata-preview'
import { type ArchetypeId, arenaKeyArchetypes, bossGates, createArenaKeyMetadata } from '../util/arenakeys-domain'
import { ArenaKeysFeatureProof } from './arenakeys-feature-proof'

export function ArenaKeysFeatureEntry() {
  const [archetypeId, setArchetypeId] = useState<ArchetypeId>('cipher-vanguard')
  const [bossGateId, setBossGateId] = useState('circuit')
  const bootstrap = useArenaKeysBootstrapQuery()
  const data = bootstrap.data ?? { archetypes: arenaKeyArchetypes, bossGates }
  const metadata = useMemo(
    () =>
      createArenaKeyMetadata({
        archetypeId,
        bossGateId,
        domain: window.location.origin,
      }),
    [archetypeId, bossGateId],
  )
  const readiness = useArenaKeysReadiness(metadata)

  return (
    <div className="min-h-full bg-[#07080a] text-zinc-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8">
        <section className="grid gap-6 border-b border-white/10 pb-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="font-mono text-xs text-cyan-300 uppercase">Nightshift 089 / Devnet access passes</p>
            <h1 className="mt-3 text-4xl font-black tracking-normal text-white sm:text-5xl">ArenaKeys 089</h1>
            <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">
              Pick a character drop, tune the boss gate, verify holder readiness, then produce a wallet-signed MPL Core
              devnet proof for the run.
            </p>
          </div>
          <div className="grid grid-cols-3 border border-white/10 bg-black/40 text-center">
            <div className="p-4">
              <p className="text-2xl font-bold text-white">{data.archetypes.length}</p>
              <p className="text-xs text-zinc-500 uppercase">Drops</p>
            </div>
            <div className="border-x border-white/10 p-4">
              <p className="text-2xl font-bold text-white">{data.bossGates.length}</p>
              <p className="text-xs text-zinc-500 uppercase">Gates</p>
            </div>
            <div className="p-4">
              <p className="text-2xl font-bold text-white">{metadata.readinessScore}</p>
              <p className="text-xs text-zinc-500 uppercase">Ready</p>
            </div>
          </div>
        </section>

        <ArenaKeysUiArchetypeRoster
          archetypes={data.archetypes}
          selectArchetype={setArchetypeId}
          selectedId={archetypeId}
        />
        <ArenaKeysUiBossGateConfig bossGateId={bossGateId} bossGates={data.bossGates} selectBossGate={setBossGateId} />
        <ArenaKeysUiMetadataPreview metadata={metadata} />
        <ArenaKeysFeatureProof
          account={readiness.account}
          checks={readiness.checks}
          metadata={metadata}
          mintReady={readiness.mintReady}
        />
      </div>
    </div>
  )
}

export function Component() {
  return <ArenaKeysFeatureEntry />
}
