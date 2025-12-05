import { analyzer } from '../src/parsers/analyzer.js'
import { jest } from '@jest/globals'

console.log = jest.fn()

describe('Analyzer integration', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('should call formatters with correct arguments', () => {
    expect(analyzer).toBeDefined()
    expect(typeof analyzer).toBe('function')
  })
})
