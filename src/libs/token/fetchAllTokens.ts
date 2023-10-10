import { apiConfig } from '../../app.config'
import type { FetchResponseData } from '../api/types'

let cachedData: FetchResponseData | undefined

export default async function fetchAllTokens(): Promise<FetchResponseData> {
  if (cachedData) return cachedData

  const response = await fetch(apiConfig.tokensUrl)

  if (!response.ok) {
    throw Error(`could not fetch tokens. Status response: ${response.status}`)
  }

  cachedData = (await response.json()) as FetchResponseData

  return cachedData
}
