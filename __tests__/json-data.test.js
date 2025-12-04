import { writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { getJSONData } from '../parsers/json-data.js'

describe('JSON/YAML data parser', () => {
  let tempDir
  let tempFile

  beforeEach(() => {
    tempDir = tmpdir()
  })

  test('should parse JSON file', () => {
    const data = { test: 'value', number: 123 }
    tempFile = join(tempDir, 'test.json')
    writeFileSync(tempFile, JSON.stringify(data))

    const result = getJSONData(tempFile)

    expect(result).toEqual(data)
  })

  test('should parse YAML file', () => {
    const yamlContent = `
test: value
number: 123
nested:
  key: value
`
    tempFile = join(tempDir, 'test.yaml')
    writeFileSync(tempFile, yamlContent)

    const result = getJSONData(tempFile)

    expect(result).toEqual({
      test: 'value',
      number: 123,
      nested: { key: 'value' },
    })
  })

  test('should parse YML file', () => {
    const ymlContent = 'key: value'
    tempFile = join(tempDir, 'test.yml')
    writeFileSync(tempFile, ymlContent)

    const result = getJSONData(tempFile)

    expect(result).toEqual({ key: 'value' })
  })

  test('should return empty object for unknown format', () => {
    tempFile = join(tempDir, 'test.txt')
    writeFileSync(tempFile, 'some text')

    const result = getJSONData(tempFile)

    expect(result).toEqual({})
  })
})
