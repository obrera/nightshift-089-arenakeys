export type ArchetypeId = 'cipher-vanguard' | 'rift-mender' | 'signal-warden' | 'void-duelist'

export interface ArenaKeyArchetype {
  accent: string
  id: ArchetypeId
  lane: string
  passive: string
  power: number
  rarity: string
  sigil: string
  title: string
}

export interface ArenaKeyMetadata {
  archetype: ArenaKeyArchetype
  attributes: { trait_type: string; value: number | string }[]
  bossGate: BossGate
  description: string
  image: string
  name: string
  readinessScore: number
  symbol: string
  uri: string
}

export interface BossGate {
  arena: string
  boss: string
  entryCost: number
  id: string
  pressure: number
}

export const arenaKeyArchetypes: ArenaKeyArchetype[] = [
  {
    accent: '#00f5c8',
    id: 'cipher-vanguard',
    lane: 'Front lane',
    passive: 'Parries the first boss break and opens a second key slot.',
    power: 91,
    rarity: 'Mythic',
    sigil: 'AK-VG',
    title: 'Cipher Vanguard',
  },
  {
    accent: '#ff4d7a',
    id: 'rift-mender',
    lane: 'Support lane',
    passive: 'Restores one failed readiness check after the arena locks.',
    power: 84,
    rarity: 'Epic',
    sigil: 'AK-RM',
    title: 'Rift Mender',
  },
  {
    accent: '#f6c445',
    id: 'void-duelist',
    lane: 'Duel lane',
    passive: 'Adds burst damage when the boss shield drops below half.',
    power: 88,
    rarity: 'Legend',
    sigil: 'AK-VD',
    title: 'Void Duelist',
  },
  {
    accent: '#49a8ff',
    id: 'signal-warden',
    lane: 'Control lane',
    passive: 'Scans holder state and stabilizes metadata before mint proof.',
    power: 79,
    rarity: 'Rare',
    sigil: 'AK-SW',
    title: 'Signal Warden',
  },
]

export const bossGates: BossGate[] = [
  { arena: 'Neon Foundry', boss: 'Krag Null-Spark', entryCost: 3, id: 'foundry', pressure: 72 },
  { arena: 'Glass Circuit', boss: 'Helio Rook', entryCost: 5, id: 'circuit', pressure: 86 },
  { arena: 'Obsidian Lock', boss: 'Matriarch Voss', entryCost: 8, id: 'obsidian', pressure: 94 },
]

export function createArenaKeyMetadata({
  archetypeId,
  bossGateId,
  domain,
}: {
  archetypeId: ArchetypeId
  bossGateId: string
  domain: string
}): ArenaKeyMetadata {
  const archetype = arenaKeyArchetypes.find((item) => item.id === archetypeId) ?? arenaKeyArchetypes[0]
  const bossGate = bossGates.find((item) => item.id === bossGateId) ?? bossGates[0]
  const readinessScore = Math.min(99, Math.round((archetype.power * 0.62 + (100 - bossGate.pressure) * 0.38) * 1.08))
  const slug = `${archetype.id}-${bossGate.id}`
  const origin = domain.replace(/\/$/, '')

  return {
    archetype,
    attributes: [
      { trait_type: 'Archetype', value: archetype.title },
      { trait_type: 'Boss Gate', value: bossGate.boss },
      { trait_type: 'Arena', value: bossGate.arena },
      { trait_type: 'Readiness', value: readinessScore },
      { trait_type: 'Entry Cost', value: bossGate.entryCost },
    ],
    bossGate,
    description: `ArenaKeys 089 access pass for ${archetype.title} entering ${bossGate.arena}.`,
    image: `${origin}/metadata/${slug}.svg`,
    name: `ArenaKeys 089: ${archetype.title} vs ${bossGate.boss}`,
    readinessScore,
    symbol: 'AK089',
    uri: `${origin}/metadata/${slug}.json`,
  }
}
