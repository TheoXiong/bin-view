const { isExist, readFile } = require('./file.js')

const format = (str, len) => {
  if (str.length < len) {
    let num = len - str.length
    for (let i = 0; i < num; i++) {
      str = '0' + str
    }
  }
  return str
}

const binaryToHexStr = async (filePath, options) => {
  if (!(await isExist(filePath))) throw new Error(`No such file: ${filePath}`)

  let tLen = (options && options.targetLength > 0) ? Number(options.targetLength) : 0
  let line = (options && options.line === false) ? false : true

  let binData = await readFile(filePath)
    .catch(err => { throw err })

  let len = binData.length
  if (tLen > 0 && tLen < len) {
    binData = binData.slice(0, tLen)
    len = binData.length
  }

  let row = Math.ceil(len / 16)
  let result = ''

  for (let i = 0; i < row; i++) {
    line ? (result += format((i * 16).toString(), 8) + ':  ') : ''

    let subStr = ''
    for (let j = 0; j < 16; j++) {
      if ((i * 16 + j) < len) {
        let sp = ((j + 1) % 4 === 0) ? '  ' : ' '
        subStr += format(binData[i * 16 + j].toString(16), 2) + sp
      } else {
        break
      }
    }
    result += subStr + '\n'
  }

  return result
}

module.exports = {
  binaryToHexStr
}
