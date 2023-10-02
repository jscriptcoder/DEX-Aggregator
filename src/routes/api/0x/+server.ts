import type { RequestEvent } from "@sveltejs/kit";
import { OX_API_KEY } from "$env/static/private";
import { chainMetaMap } from "../../../libs/web3/chains";

// This endpoint will hide the OX_API_KEY
export function GET({ url }: RequestEvent) {
  const { searchParams } = url
  const chainId = Number(searchParams.get('chainId'))
  const {api} = chainMetaMap[chainId]

  searchParams.delete('chainId')

  return fetch(`${api}/swap/v1/quote?${url.searchParams}`, { headers: { '0x-api-key': OX_API_KEY } })  
}
