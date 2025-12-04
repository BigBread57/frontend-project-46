export const stylishCallback = (acc, item) => {
  if (Array.isArray(item.value)) {
    acc[`${item.diff}${item.key}`] = item.value.reduce(stylishCallback, {})
  }
  else {
    acc[`${item.diff}${item.key}`] = item.value
  }
  return acc
}
