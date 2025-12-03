import { readFileSync } from 'node:fs'
import _ from 'lodash'

import { cwd } from 'node:process'
import path from 'node:path'

export const analyzer = (filePath1, filePath2) => {
  const correctFilePath1 = path.resolve(cwd(), filePath1)
  const correctFilePath2 = path.resolve(cwd(), filePath2)

  const data1 = readFileSync(correctFilePath1, 'utf8')
  const data2 = readFileSync(correctFilePath2, 'utf8')
  const jsonData1 = JSON.parse(data1)
  const jsonData2 = JSON.parse(data2)
  let result = []
  for (const key in jsonData1) {
    if (key in jsonData2) {
      if (jsonData2[key] === jsonData1[key]) {
        result.push({ key: key, value: jsonData1[key], diff: '' })
      }
      else {
        result.push({ key: key, value: jsonData1[key], diff: '- ' })
        result.push({ key: key, value: jsonData2[key], diff: '+ ' })
      }
    }
    else {
      result.push({ key: key, value: jsonData1[key], diff: '- ' })
    }
  }

  for (const key in jsonData2) {
    if (!(key in jsonData2)) {
      result.push({ key: key, value: jsonData1[key], diff: '+ ' })
    }
  }

  const callback = (acc, item) => {
    acc[`${item.diff}${item.key}`] = item.value
    return acc
  }

  const sortedEntries = _.sortBy(result, 'key').reduce(callback, {})

  console.log(JSON.stringify(sortedEntries))
}
