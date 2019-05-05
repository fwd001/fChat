const fs = require('fs')
const path = require('path')

module.exports = {
	findAllChat(callback) {
		readNewsData(data => callback(data))
	},
	addOneChat(chat, callback) {
		writeNewsData(chat, callback)
	},
	addMoreChat(chatList, callback) {
		writeMoreNewsData(chatList, callback)
	},
	deleteAll(callback) {
		writeNewsData([], callback)
	}
}

function readNewsData(callback) {
	fs.readFile(path.join(__dirname, 'data', 'chatList.json'), 'utf8', function(
		err,
		data
	) {
		if (err) {
			return console.log('读取文件失败了', err)
		}
		const list = data ? JSON.parse(data) : []
		callback(list)
	})
}

function writeNewsData(data, callback) {
	readNewsData(temporary => {
		let list = [...temporary]
		list.push(data)
		fs.writeFile(
			path.join(__dirname, 'data', 'chatList.json'),
			JSON.stringify(list, null, 2),
			function(err) {
				if (err) {
					return console.log('写入文件失败', err)
				}
				callback()
			}
		)
	})
}
function writeMoreNewsData(data, callback) {
	readNewsData(temporary => {
		let list = [...temporary, ...data]
		fs.writeFile(
			path.join(__dirname, 'data', 'chatList.json'),
			JSON.stringify(list, null, 2),
			function(err) {
				if (err) {
					return console.log('写入文件失败', err)
				}
				callback()
			}
		)
	})
}
