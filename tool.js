const fs = require('fs')
const getJsonFiles = () => {
  function findJsonFile(path) {
    let files = fs.readdirSync(path)
    files = files.map(v => {
      const date = parseInt(v.split('***')[0])
      const name = v.split('***')[1]
      return {
        name,
        downName: v,
        date
      }
    })
    return files
  }
  return findJsonFile('uploads')
}

module.exports = { getJsonFiles }
