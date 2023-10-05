import type { RequestEvent } from '@sveltejs/kit'
import { OX_API_KEY } from '$env/static/private'
import { chainMetaMap } from '../../../libs/web3/chains'

// This endpoint will hide the OX_API_KEY
export function GET({ url }: RequestEvent) {
  const { searchParams } = url

  const apiCall = searchParams.get('apiCall')
  const chainId = Number(searchParams.get('chainId'))

  searchParams.delete('endpoint')
  searchParams.delete('chainId')

  const { apiBase } = chainMetaMap[chainId]

  return fetch(`${apiBase}/swap/v1/${apiCall}?${url.searchParams}`, { headers: { '0x-api-key': OX_API_KEY } })
}
