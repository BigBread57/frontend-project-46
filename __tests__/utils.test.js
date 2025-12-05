import {
  analyzerDiff,
  deepSort,
} from '../src/parsers/utils.js'
import { stylishCallback } from '../src/formatters/stylish.js'

describe('Utils functions', () => {
  describe('analyzerDiff', () => {
    test('should find added properties', () => {
      const data1 = { a: 1 }
      const data2 = { a: 1, b: 2 }
      const result = []

      analyzerDiff(data1, data2, result)

      expect(result).toEqual([
        { key: 'a', value: 1, diff: '' },
        { key: 'b', value: 2, diff: '+ ' },
      ])
    })

    test('should find removed properties', () => {
      const data1 = { a: 1, b: 2 }
      const data2 = { a: 1 }
      const result = []

      analyzerDiff(data1, data2, result)

      expect(result).toEqual([
        { key: 'a', value: 1, diff: '' },
        { key: 'b', value: 2, diff: '- ' },
      ])
    })

    test('should find changed properties', () => {
      const data1 = { a: 1 }
      const data2 = { a: 2 }
      const result = []

      analyzerDiff(data1, data2, result)

      expect(result).toEqual([
        { key: 'a', value: 1, diff: '- ' },
        { key: 'a', value: 2, diff: '+ ' },
      ])
    })

    test('should handle nested objects', () => {
      const data1 = { a: { b: 1 } }
      const data2 = { a: { b: 2 } }
      const result = []

      analyzerDiff(data1, data2, result)

      expect(result).toEqual([
        {
          key: 'a',
          value: [
            { key: 'b', value: 1, diff: '- ' },
            { key: 'b', value: 2, diff: '+ ' },
          ],
          diff: '',
        },
      ])
    })
  })

  describe('deepSort', () => {
    test('should sort array by key', () => {
      const items = [
        { key: 'b', value: 2 },
        { key: 'a', value: 1 },
        { key: 'c', value: 3 },
      ]

      const sorted = deepSort(items)

      expect(sorted).toEqual([
        { key: 'a', value: 1 },
        { key: 'b', value: 2 },
        { key: 'c', value: 3 },
      ])
    })

    test('should sort nested arrays recursively', () => {
      const items = [
        {
          key: 'b',
          value: [
            { key: 'z', value: 1 },
            { key: 'x', value: 2 },
          ],
        },
        { key: 'a', value: 3 },
      ]

      const sorted = deepSort(items)

      expect(sorted).toEqual([
        { key: 'a', value: 3 },
        {
          key: 'b',
          value: [
            { key: 'x', value: 2 },
            { key: 'z', value: 1 },
          ],
        },
      ])
    })

    test('should return non-array values as is', () => {
      expect(deepSort('test')).toBe('test')
      expect(deepSort(null)).toBe(null)
      expect(deepSort(123)).toBe(123)
    })
  })

  describe('stylishCallback', () => {
    test('should transform simple object', () => {
      const items = [
        { key: 'a', value: 1, diff: '' },
        { key: 'b', value: 2, diff: '- ' },
        { key: 'c', value: 3, diff: '+ ' },
      ]

      const result = items.reduce(stylishCallback, {})

      expect(result).toEqual({
        '  a': 1,
        '- b': 2,
        '+ c': 3,
      })
    })

    test('should handle nested objects', () => {
      const items = [
        {
          key: 'a',
          value: [
            { key: 'b', value: 1, diff: '' },
          ],
          diff: '',
        },
      ]

      const result = items.reduce(stylishCallback, {})

      expect(result).toEqual({
        '  a': { '  b': 1 },
      })
    })
  })
})
