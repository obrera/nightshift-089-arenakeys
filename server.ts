import {
  type ArchetypeId,
  arenaKeyArchetypes,
  bossGates,
  createArenaKeyMetadata,
} from './src/arenakeys/util/arenakeys-domain'

const port = Number(process.env.PORT ?? 3000)
const distRoot = new URL('./dist/', import.meta.url)

function escapeXml(value: string) {
  return value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function json(data: unknown, init?: ResponseInit) {
  return Response.json(data, {
    headers: { 'cache-control': 'no-store', ...init?.headers },
    status: init?.status,
  })
}

function normalizeArchetypeId(slug: string): ArchetypeId {
  return arenaKeyArchetypes.find((item) => slug.startsWith(item.id))?.id ?? 'cipher-vanguard'
}

function renderArenaKeySvg(slug: string) {
  const [, bossGateId = 'circuit'] = slug.replace(/\.svg$/, '').split('-')
  const archetype = arenaKeyArchetypes.find((item) => item.id === normalizeArchetypeId(slug)) ?? arenaKeyArchetypes[0]
  const gate =
    bossGates.find((item) => slug.endsWith(item.id)) ?? bossGates.find((item) => item.id === bossGateId) ?? bossGates[0]

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1500" role="img">
  <rect width="1200" height="1500" fill="#07080a"/>
  <rect x="70" y="70" width="1060" height="1360" fill="#0f1116" stroke="rgba(255,255,255,.18)" stroke-width="4"/>
  <path d="M120 460H1080M120 1040H1080M600 160V1340" stroke="rgba(255,255,255,.12)" stroke-width="3"/>
  <g transform="translate(600 560)">
    <rect x="-210" y="-210" width="420" height="420" transform="rotate(45)" fill="none" stroke="${archetype.accent}" stroke-width="22"/>
    <rect x="-150" y="-150" width="300" height="300" fill="none" stroke="rgba(255,255,255,.45)" stroke-width="6"/>
    <circle r="96" fill="${archetype.accent}" opacity=".22"/>
    <path d="M-240 0H240M0-240V240" stroke="white" stroke-opacity=".62" stroke-width="8"/>
  </g>
  <text x="120" y="190" fill="#ffffff" font-family="monospace" font-size="46" font-weight="800">ARENAKEYS 089</text>
  <text x="120" y="1240" fill="${archetype.accent}" font-family="monospace" font-size="68" font-weight="800">${escapeXml(archetype.title)}</text>
  <text x="120" y="1320" fill="#d4d4d8" font-family="monospace" font-size="38">${escapeXml(gate.boss)}</text>
  <text x="120" y="1380" fill="#71717a" font-family="monospace" font-size="28">${escapeXml(gate.arena)} / ${escapeXml(archetype.rarity)}</text>
</svg>`
}

async function serveStatic(pathname: string) {
  const filePath = pathname === '/' ? 'index.html' : pathname.slice(1)
  const file = Bun.file(new URL(filePath, distRoot))

  if (await file.exists()) {
    return new Response(file)
  }

  return new Response(Bun.file(new URL('index.html', distRoot)))
}

Bun.serve({
  async fetch(request) {
    const url = new URL(request.url)

    if (url.pathname === '/health' || url.pathname === '/api/health') {
      return json({ ok: true, project: 'ArenaKeys 089' })
    }

    if (url.pathname === '/api/bootstrap') {
      return json({ archetypes: arenaKeyArchetypes, bossGates })
    }

    const metadataMatch = url.pathname.match(/^\/metadata\/(.+)\.json$/)
    if (metadataMatch?.[1]) {
      const slug = metadataMatch[1]
      return json(
        createArenaKeyMetadata({
          archetypeId: normalizeArchetypeId(slug),
          bossGateId: bossGates.find((item) => slug.endsWith(item.id))?.id ?? 'circuit',
          domain: url.origin,
        }),
      )
    }

    const imageMatch = url.pathname.match(/^\/metadata\/(.+)\.svg$/)
    if (imageMatch?.[1]) {
      return new Response(renderArenaKeySvg(imageMatch[1]), {
        headers: { 'cache-control': 'public, max-age=300', 'content-type': 'image/svg+xml; charset=utf-8' },
      })
    }

    return serveStatic(url.pathname)
  },
  port,
})

console.log(`ArenaKeys 089 server listening on ${port}`)
