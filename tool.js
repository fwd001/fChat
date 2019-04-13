
const getJsonFiles = () => {
  function findJsonFile(path) {
    let files = fs.readdirSync(path)
    return files
  }
  return findJsonFile('upload')
}

module.exports = {getJsonFiles}