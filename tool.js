const fs = require('fs')
const path = require('path');
// 返回制定文件下内容
const getJsonFiles = () => {
	function findJsonFile(path) {
		let files = fs.readdirSync(path)
		files = files.map(v => {
			const date = parseInt(v.split('---')[0])
			const name = v.split('---')[1]
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

// 清空制定文件夹下内容
const delDir = pathName => {
	let files = []
	if (fs.existsSync(pathName)) {
		files = fs.readdirSync(pathName)
		files.forEach(file => {
			// console.log(file)
			// let curPath = __dirname + '/' + pathName + '/' + file
			let curPath = path.join(__dirname, pathName, file)
			console.log(curPath);
			fs.unlinkSync(curPath) //删除文件
		})
	}
}

// 24小时后删除指定文件
const delOneFile = fileName => {
	setTimeout(() => {
		let curPath = path.join(__dirname, 'uploads', fileName)
		fs.unlinkSync(curPath) //删除文件
	}, 1000 * 60 * 60 * 24);
}



module.exports = { getJsonFiles, delDir, delOneFile }
