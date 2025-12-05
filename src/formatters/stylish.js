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
  const obj = raw_result.reduce(stylishCallback, {})

  const formatObject = (object, depth = 1) => {
    const indent = '    '.repeat(depth)
    const entries = Object.entries(object)

    const lines = entries.map(([key, value]) => {
      // Определяем, есть ли у ключа префикс + или -
      const hasDiffPrefix = key.startsWith('+ ') || key.startsWith('- ')

      // Специальный отступ для строк с +/-
      const lineIndent = hasDiffPrefix
        ? '    '.repeat(depth - 1) + '  ' // На 2 пробела меньше
        : indent

      if (typeof value === 'object' && value !== null) {
        return `${lineIndent}${key}: ${formatObject(value, depth + 1)}`
      }

      return `${lineIndent}${key}: ${value}`
    })

    return `{\n${lines.join('\n')}\n${'    '.repeat(depth - 1)}}`
  }

  return formatObject(obj)
}
