import type { CSSProperties } from 'react'

import { Badge } from '@/core/ui/badge'
import { Button } from '@/core/ui/button'
import { cn } from '@/core/util/utils'

import type { ArchetypeId, ArenaKeyArchetype } from '../util/arenakeys-domain'

export function ArenaKeysUiArchetypeRoster({
  archetypes,
  selectArchetype,
  selectedId,
}: {
  archetypes: ArenaKeyArchetype[]
  selectArchetype: (id: ArchetypeId) => void
  selectedId: ArchetypeId
}) {
  return (
    <section className="grid gap-3 lg:grid-cols-4">
      {archetypes.map((archetype) => {
        const selected = archetype.id === selectedId

        return (
          <Button
            className={cn(
              'h-auto min-h-48 flex-col items-stretch justify-between rounded-md border border-white/10 bg-zinc-950/80 p-0 text-left shadow-[0_0_0_1px_rgba(255,255,255,0.04)] hover:bg-zinc-900',
              selected && 'border-white/45 bg-zinc-900 ring-2 ring-white/15',
            )}
            key={archetype.id}
            onClick={() => selectArchetype(archetype.id)}
            style={{ '--ak-accent': archetype.accent } as CSSProperties}
            variant="ghost"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <Badge className="rounded-sm bg-[var(--ak-accent)] text-black">{archetype.rarity}</Badge>
              <span className="font-mono text-xs text-zinc-500">{archetype.sigil}</span>
            </div>
            <div className="flex flex-1 flex-col justify-between gap-4 p-4">
              <div className="grid h-24 place-items-center border border-dashed border-white/15 bg-black/35">
                <div className="relative h-16 w-16">
                  <div className="absolute inset-0 rotate-45 border-2 border-[var(--ak-accent)]" />
                  <div className="absolute inset-4 rounded-full bg-[var(--ak-accent)]/30" />
                  <div className="absolute inset-x-2 top-1/2 h-px bg-white/70" />
                  <div className="absolute inset-y-2 left-1/2 w-px bg-white/70" />
                </div>
              </div>
              <div>
                <h2 className="text-base font-semibold text-white">{archetype.title}</h2>
                <p className="mt-1 text-xs text-zinc-400">{archetype.passive}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-zinc-500 uppercase">
                <span>{archetype.lane}</span>
                <span>{archetype.power} POW</span>
              </div>
            </div>
          </Button>
        )
      })}
    </section>
  )
}
