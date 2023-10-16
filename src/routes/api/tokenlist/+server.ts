// import type { RequestEvent } from '@sveltejs/kit'

const data = {
  name: 'Testing',
  tokens: [
    {
      chainId: 11155111,
      address: "0xf08A50178dfcDe18524640EA6618a1f965821715",
      name: "USDC",
      symbol: "USDC",
      decimals: 6,
      logoURI: "https://assets.coingecko.com/coins/images/6319/thumb/usdc.png?1696506694"
    }
  ]
}

export function GET() {

  return Promise.resolve(new Response(JSON.stringify(data), { status: 200 }))
}
