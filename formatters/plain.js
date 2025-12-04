const formatValue = (value) => {
  if (value === undefined || value === '') {
    return '\'\''
  }
  if (value === null) {
    return 'null'
  }
  if (typeof value === 'object') {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return value
}

const flattenTree = (node, parentPath = '') => {
  const { key, value, diff } = node
  const currentPath = parentPath ? `${parentPath}.${key}` : key
  const result = [{ path: currentPath, value, diff }]

  if (diff === '' && Array.isArray(value)) {
    value.forEach((childNode) => {
      result.push(...flattenTree(childNode, currentPath))
    })
  }

  return result
}

export const plainDiff = (diffTree) => {
  const allNodes = []
  diffTree.forEach((node) => {
    allNodes.push(...flattenTree(node))
  })

  const nodesByPath = {}
  allNodes.forEach((node) => {
    const { path, value, diff } = node
    if (!nodesByPath[path]) {
      nodesByPath[path] = []
    }
    nodesByPath[path].push({ value, diff })
  })

  const result = []

  Object.entries(nodesByPath).forEach(([path, nodes]) => {
    if (nodes.length === 1) {
      const [{ value, diff }] = nodes

      if (diff === '- ') {
        result.push(`Property '${path}' was removed`)
      }
      else if (diff === '+ ') {
        const valueStr = formatValue(value)
        result.push(`Property '${path}' was added with value: ${valueStr}`)
      }
    }
    else if (nodes.length === 2) {
      const [first, second] = nodes

      let oldValue, newValue
      if (first.diff === '- ' && second.diff === '+ ') {
        oldValue = first.value
        newValue = second.value
      }
      else if (second.diff === '- ' && first.diff === '+ ') {
        oldValue = second.value
        newValue = first.value
      }
      else {
        return
      }
      result.push(`Property '${path}' was updated. From ${formatValue(oldValue)} to ${formatValue(newValue)}`)
    }
  })

  return result.join('\n')
}
