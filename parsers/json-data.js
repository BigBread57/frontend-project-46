#!/usr/bin/env node

import { readFileSync } from 'node:fs'
import { cwd } from 'node:process'
import path from 'node:path'
import yaml from 'js-yaml'

const getDataByType = (filePath) => {
  const raw_data = readFileSync(filePath, 'utf8')
  switch (path.extname(filePath)) {
    case '.yml':
      return yaml.load(raw_data)
    case '.yaml':
      return yaml.load(raw_data)
    case '.json':
      return JSON.parse(raw_data)
    default:
      return {}
  }
}

export const getJSONData = (filePath) => {
  const correctFilePath = path.resolve(cwd(), filePath)
  return getDataByType(correctFilePath)
}
