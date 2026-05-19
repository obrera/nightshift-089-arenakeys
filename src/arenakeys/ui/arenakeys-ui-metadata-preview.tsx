import { BadgeCheck, ShieldCheck } from 'lucide-react'

import { Badge } from '@/core/ui/badge'

import type { ArenaKeyMetadata } from '../util/arenakeys-domain'

export function ArenaKeysUiMetadataPreview({ metadata }: { metadata: ArenaKeyMetadata }) {
  return (
    <section className="grid gap-5 lg:grid-cols-[minmax(280px,360px)_1fr]">
      <div className="border border-white/10 bg-zinc-950 p-4">
        <div
          className="grid aspect-[4/5] place-items-center border border-white/10 bg-black"
          style={{
            backgroundImage: `linear-gradient(150deg, ${metadata.archetype.accent}22, transparent 42%), radial-gradient(circle at 50% 28%, ${metadata.archetype.accent}33, transparent 28%)`,
          }}
        >
          <div className="relative h-48 w-48">
            <div className="absolute inset-0 rotate-45 border-4" style={{ borderColor: metadata.archetype.accent }} />
            <div className="absolute inset-8 border border-white/55" />
            <div className="absolute top-0 left-1/2 h-full w-px bg-white/45" />
            <div className="absolute top-1/2 left-0 h-px w-full bg-white/45" />
            <div className="absolute inset-x-10 top-1/2 h-12 -translate-y-1/2 border-y border-white/35" />
          </div>
        </div>
      </div>
      <div className="border border-white/10 bg-black/45 p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs text-zinc-500 uppercase">{metadata.symbol}</p>
            <h2 className="mt-2 max-w-2xl text-2xl font-semibold text-white">{metadata.name}</h2>
            <p className="mt-3 text-sm text-zinc-400">{metadata.description}</p>
          </div>
          <Badge className="rounded-sm bg-emerald-300 text-black">
            <BadgeCheck size={14} />
            Generated
          </Badge>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {metadata.attributes.map((attribute) => (
            <div className="border border-white/10 bg-zinc-950/70 p-3" key={attribute.trait_type}>
              <p className="text-xs text-zinc-500 uppercase">{attribute.trait_type}</p>
              <p className="mt-1 text-sm font-medium text-zinc-100">{attribute.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center gap-3 border border-cyan-300/20 bg-cyan-300/10 p-4 text-cyan-100">
          <ShieldCheck size={22} />
          <span className="text-sm">
            Readiness score {metadata.readinessScore}. Metadata routes resolve at image and JSON endpoints.
          </span>
        </div>
      </div>
    </section>
  )
}
