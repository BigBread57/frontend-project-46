#!/usr/bin/env node

import { getJSONData } from './json-data.js'
import { analyzerDiff, deepSort } from './utils.js'
import { formatters } from '../formatters/index.js'

export const analyzer = (filePath1, filePath2, format) => {
  const data1 = getJSONData(filePath1)
  const data2 = getJSONData(filePath2)
  let raw_result = []
  raw_result = deepSort(analyzerDiff(data1, data2, raw_result))
  return formatters(raw_result, format)
}
