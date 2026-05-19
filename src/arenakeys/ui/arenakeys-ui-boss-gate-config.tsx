import { KeyRound } from 'lucide-react'

import { Button } from '@/core/ui/button'
import { cn } from '@/core/util/utils'

import type { BossGate } from '../util/arenakeys-domain'

export function ArenaKeysUiBossGateConfig({
  bossGateId,
  bossGates,
  selectBossGate,
}: {
  bossGateId: string
  bossGates: BossGate[]
  selectBossGate: (id: string) => void
}) {
  return (
    <section className="grid gap-3 lg:grid-cols-3">
      {bossGates.map((gate) => {
        const selected = gate.id === bossGateId

        return (
          <Button
            className={cn(
              'h-auto justify-start gap-4 rounded-md border border-white/10 bg-black/35 p-4 text-left hover:bg-zinc-900',
              selected && 'border-amber-300/60 bg-amber-300/10',
            )}
            key={gate.id}
            onClick={() => selectBossGate(gate.id)}
            variant="ghost"
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center border border-amber-300/50 bg-amber-300/10 text-amber-200">
              <KeyRound size={22} />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-white">{gate.boss}</span>
              <span className="mt-1 block text-xs text-zinc-400">{gate.arena}</span>
              <span className="mt-3 block font-mono text-xs text-zinc-500">
                {gate.entryCost} glyphs / pressure {gate.pressure}
              </span>
            </span>
          </Button>
        )
      })}
    </section>
  )
}
