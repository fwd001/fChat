var router = require('express').Router()
const multer = require('multer')
const fs = require('fs')
const {getJsonFiles} = require('./tool')

const uploadFolder = 'uploads/'
// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadFolder) // 保存的路径，备注：需要自己创建
  },
  filename: function(req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    // console.log(file);
    cb(null, Date.now() + '***' + file.originalname)
  }
})

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

//获取所有的新闻接口：
//localhost:9999/getNewsList : 可以获取到所有的新闻
router.get('/fileList', function(req, res) {
  const list = getJsonFiles()
  //获取到所有的新闻的数据，把数据响应给浏览器
  res.send({
    code: 200,
    msg: '成功！',
    data: list
  })
})
router.post('/test', upload.single('file'), function(req, res, next) {
  let file = req.file
  console.log(file.filename)
  newFileName = file.filename
  res.json({ message: 'ok' })
})

router.get('/download', function(req, res, next) {
  const name = req.query.name
  const downName = name.split('***')[1]
  // console.log(downName);
  //第二种方式
  var path = `./uploads/${name}`
  var f = fs.createReadStream(path)

  res.writeHead(200, {
    'Content-Type': 'application/force-download',
    'Content-Disposition': `attachment; filename=${encodeURI(downName)}`
  })
  f.pipe(res)
})

module.exports = router
