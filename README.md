# DEX Aggregator (work in progress)

<p align="center">
  <img width="250" src="resources/decentralized-exchange.png" alt="Decentralized Exchanges">
</p>

This app aggregates liquidity across the greater DEX ecosystem and surfaces the best price to the user using the [0x](https://0x.org/docs) swap API. Work is still ongoing.

Latest deployment: https://simple-dex-aggregator.vercel.app

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
