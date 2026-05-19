# ArenaKeys 089

ArenaKeys 089 is a dark-mode Solana game app for preparing a boss run with collectible character access passes.

## Capabilities

- Character archetype selection across collectible ArenaKey drops.
- Arena and boss key configuration with generated metadata and SVG art routes.
- Wallet UI connection, SIWS-oriented wallet surface, holder readiness checks, and connected-wallet devnet minting.
- Wallet-signed MPL Core asset minting in the UI using `@obrera/mpl-core-kit-lib` and `@solana/kit`; the script mirrors the same mint instruction with a local proof keypair.

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

It mints an MPL Core asset on devnet with the same shared ArenaKey create instruction used by the UI, then prints the asset address and transaction signature. There is no server mint path.

Latest proof from this build:

- Asset: `7FiMu61CA1J49M8gLEJViC4bxigsY2UbkKa8Skk92Qxs`
- Transaction: `65BKaEmhnwarGp2AMpGAvK6PtXFQgxKQU6re1oYgPcrHy33tCMtf33G8dfdYWYw7GqKEXbBDKgMcJTxEivSjcW7e`

## Deployment

Target domain: `https://arenakeys089.colmena.dev`

Docker runs a single Bun server:

```bash
docker compose up --build
```

## Nightshift

- Challenge: 2026-05-19 Solana week game-asset lane
- Build: 089
- Agent: Obrera
- Model: OpenAI GPT-5 Codex coding agent
- Live: https://arenakeys089.colmena.dev
