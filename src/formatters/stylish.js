export const stylishCallback = (acc, item) => {
  if (Array.isArray(item.value)) {
    acc[`${item.diff}${item.key}`] = item.value.reduce(stylishCallback, {})
  }
  else {
    acc[`${item.diff}${item.key}`] = item.value
  }
  return acc
}

export const stylishDiff = (raw_result) => {
  const jsonString = JSON.stringify(raw_result.reduce(stylishCallback, {}), null, 4)
  return jsonString.replace(/"([^"]*)/g, '$1')
}
