import { formatters } from '../src/formatters/index.js'

describe('Formatters', () => {
  const mockDiffTree = [
    {
      key: 'common',
      value: [
        { key: 'setting1', value: 'Value 1', diff: '' },
        { key: 'setting2', value: 200, diff: '- ' },
        { key: 'setting3', value: true, diff: '+ ' },
      ],
      diff: '',
    },
  ]

  const stylishTree = '{\n'
    + '    common: {\n'
    + '        setting1: Value 1,\n'
    + '        - setting2: 200,\n'
    + '        + setting3: true\n'
    + '    }\n'
    + '}'

  test('should return empty string for unknown format', () => {
    const result = formatters(mockDiffTree, 'unknown')
    expect(result).toBe('')
  })

  test('should format with stylish format', () => {
    const result = formatters(mockDiffTree, 'stylish')
    expect(result).toContain(stylishTree)
  })

  test('should format with plain format', () => {
    const simpleDiff = [
      { key: 'setting1', value: 'Value 1', diff: '' },
      { key: 'setting2', value: 200, diff: '- ' },
      { key: 'setting3', value: true, diff: '+ ' },
    ]

    const result = formatters(simpleDiff, 'plain')

    expect(result).toContain('Property \'setting2\' was removed')
    expect(result).toContain('Property \'setting3\' was added')
  })
})
