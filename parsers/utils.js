import _ from 'lodash'

export const analyzerDiff = (data1, data2, result) => {
  for (const key in data1) {
    if (key in data2) {
      if (data1[key] instanceof Object && data2[key] instanceof Object) {
        result.push({ key: key, value: analyzerDiff(data1[key], data2[key], []), diff: '' })
        if (Object.keys(data2[key]).length === 0) {
          delete data2[key]
          continue
        }
      }

      if (data2[key] === data1[key]) {
        result.push({ key: key, value: data1[key], diff: '' })
      }
      else {
        result.push({ key: key, value: data1[key], diff: '- ' })
        result.push({ key: key, value: data2[key], diff: '+ ' })
      }
      delete data2[key]
    }
    else {
      result.push({ key: key, value: data1[key], diff: '- ' })
    }
  }
  if (!(data2 instanceof Object)) {
    return data2
  }
  for (const key in data2) {
    result.push({ key: key, value: data2[key], diff: '+ ' })
    delete data2[key]
  }
  return result
}

export const deepSort = (items) => {
  if (!Array.isArray(items)) return items
  const sorted = _.sortBy(items, 'key')
  return sorted.map((item) => {
    if (Array.isArray(item.value)) {
      return {
        ...item,
        value: deepSort(item.value),
      }
    }
    return item
  })
}
