const fs = require('fs')
const path = require('path')

const isExist = filePath => {
  return new Promise((resolve, reject) => {
    fs.access(path.resolve(filePath), fs.constants.F_OK, (err) => {
      err ? resolve(false) : resolve(true)
    })
  })
}

const readFile = (filePath, encoding) => {
  return new Promise((resolve, reject) => {
    let argv = [path.resolve(filePath)]
    encoding ? argv.push(encoding) : ''
    const cb = (err, data) => {
      err ? reject(err) : resolve(data)
    }
    argv.push(cb)
    fs.readFile(...argv)
  })
}

const writeFile = (filePath, data) => {
  return new Promise((resolve, reject) => {
    if (!(data && data.length > 0)) {
      return reject(new Error('Invalid data.'))
    }

    fs.writeFile(path.resolve(filePath), data, err => {
      if (err) {
        return reject(err)
      }
      return resolve(data.length)
    })
  })
}

module.exports = {
  isExist,
  readFile,
  writeFile
}
