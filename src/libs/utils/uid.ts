export function uid(radix = 16) {
  return Math.floor(Math.random() * Date.now()).toString(radix)
}
