import { stylishDiff } from './stylish.js'
import { plainDiff } from './plain.js'

export const formatters = (raw_result, format) => {
  switch (format) {
    case 'stylish':
      return stylishDiff(raw_result)
    case 'plain':
      return plainDiff(raw_result)
    case 'json':
      return JSON.stringify(raw_result)
    default:
      return ''
  }
}
