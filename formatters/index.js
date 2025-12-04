import { stylishCallback } from './stylish.js'
import { plainDiff } from './plain.js'

export const formatters = (raw_result, format) => {
  switch (format) {
    case 'stylish':
      return JSON.stringify(raw_result.reduce(stylishCallback, {}), null, 2)
    case 'plain':
      return plainDiff(raw_result)
    default:
      return ''
  }
}
