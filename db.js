/* 
  db.js只和数据库有关
  专门用于获取数据
*/
var MongoClient = require('mongodb').MongoClient
// var ObjectID = require('mongodb').ObjectID

var url = 'mongodb://localhost:27017' //数据库服务器的地址
var dbName = 'fChat' //数据库的名字

module.exports = {
  //获取所有历史聊天记录
  findAllChat: function(callback) {
    //1. 读取数据库中的数据
    //2. 渲染首页
    MongoClient.connect(url, function(err, client) {
      if (err) {
        return console.log('连接服务器失败了', err)
      }
      var db = client.db(dbName)

      //查询所有的新闻的数据
      db.collection('chatlist')
        .find()
        .toArray(function(err, result) {
          if (err) {
            return console.log('读取数据失败了', err)
          }
          //获取到所有的数据之后，调用callback
          callback(result)
        })
      //关闭服务器
      client.close()
    })
  },

  //增加一条聊天记录
  addOneChat: function(chat, callback) {
    MongoClient.connect(url, function(err, client) {
      if (err) {
        return console.log('连接数据失败', err)
      }
      var db = client.db(dbName)

      db.collection('chatlist').insertOne({ ...chat }, function(err, result) {
        if (err) {
          return console.log('添加数据失败了')
        }
        if (result.result.ok === 1) {
          callback()
        }
      })

      client.close()
    })
  },

  deleteAll (callback) {
    MongoClient.connect(url, function(err, client) {
      if (err) {
        return console.log('连接数据失败', err)
      }
      var db = client.db(dbName)

      db.collection('chatlist').deleteMany(function(err, result) {
        if (err) return console.log('删除数据失败了')
        console.log(result);
        if (result.result.ok === 1) {
          callback()
        }
      })

      client.close()
    })
  }
}

