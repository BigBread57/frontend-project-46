import { stylishCallback } from './stylish.js'
import { plainDiff } from './plain.js'

export const formatters = (raw_result, format) => {
  switch (format) {
    case 'stylish': {
      const jsonString = JSON.stringify(raw_result.reduce(stylishCallback, {}), null, 4)
      return jsonString.replace(/"([^"]*)/g, '$1')
    }
    case 'plain':
      return plainDiff(raw_result)
    case 'json':
      return JSON.stringify(raw_result)
    default:
      return ''
  }
}
