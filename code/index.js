import { analyzer } from '../src/parsers/analyzer.js'

const genDiff = (filePath1, filePath2, format = 'stylish') => {
  console.log(analyzer(filePath1, filePath2, format))
}

export default genDiff
