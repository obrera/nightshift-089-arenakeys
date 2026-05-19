import { useQuery } from '@tanstack/react-query'

import { arenaKeyArchetypes, bossGates } from '../util/arenakeys-domain'

export function useArenaKeysBootstrapQuery() {
  return useQuery({
    queryFn: async () => {
      const response = await fetch('/api/bootstrap')
      if (!response.ok) {
        return { archetypes: arenaKeyArchetypes, bossGates }
      }

      return (await response.json()) as { archetypes: typeof arenaKeyArchetypes; bossGates: typeof bossGates }
    },
    queryKey: ['arenakeys-bootstrap'],
    staleTime: 60_000,
  })
}
