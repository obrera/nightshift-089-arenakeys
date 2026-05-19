# ArenaKeys 089

ArenaKeys 089 is a dark-mode Solana game app for preparing a boss run with collectible character access passes.

## Capabilities

- Character archetype selection across collectible ArenaKey drops.
- Arena and boss key configuration with generated metadata and SVG art routes.
- Wallet UI connection, SIWS-oriented wallet surface, holder readiness checks, and devnet proof signing.
- Wallet/local-keypair signed devnet MPL Core asset mint proof using `@obrera/mpl-core-kit-lib` and `@solana/kit`.

## Scripts

```bash
bun install
bun run lint:fix
bun run check-types
bun run build
bun run proof:mint
bun run start
```

The Bun server serves Vite `dist` plus:

- `/health`
- `/api/health`
- `/api/bootstrap`
- `/metadata/:slug.json`
- `/metadata/:slug.svg`

## Devnet Proof

`bun run proof:mint` signs locally as the player/proof wallet at:

`/home/obrera/keys/obrE1BHvP4EX8PkxPxAJxYfQkgfgCmXyJadQA3yBb7G.json`

It mints an MPL Core asset on devnet and prints the asset address and transaction signature. There is no server mint path.

## Deployment

Target domain: `https://arenakeys089.colmena.dev`

Docker runs a single Bun server:

```bash
docker compose up --build
```
