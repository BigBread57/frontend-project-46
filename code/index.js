#!/usr/bin/env node
import { Command } from 'commander'
import { analyzer } from '../src/parsers/analyzer.js'

const program = new Command()

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0', '-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format (default: "stylish")')
  .argument('<filePath1>', 'path to first file')
  .argument('<filePath2>', 'path to second file')
  .helpOption('-h, --help', 'display help for command')
  .action((filePath1, filePath2, options) => {
    const format = options.format ? options.format : 'stylish'
    console.log(analyzer(filePath1, filePath2, format))
  })

program.parse()
