export default function getError(response: Response): Promise<unknown> {
  try {
    return response.json()
  } catch (e) {
    return Promise.resolve(response.statusText)
  }
}
