var router = require('express').Router()
const multer = require('multer')
// var upload = multer({
//   dest: 'upload/',
//   filename: function(req, file, cb) {
//     // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
//     cb(null, file.fieldname + '-' + Date.now())
//   }
// })
const uploadFolder = 'upload/'
// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, uploadFolder);    // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
      // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
      console.log(file);
      cb(null, Date.now()+ '-' + file.originalname );  
  }
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

//获取所有的新闻接口：
//localhost:9999/getNewsList : 可以获取到所有的新闻
router.get('/test', function(req, res) {
  //获取到所有的新闻的数据，把数据响应给浏览器
  res.send({
    code: 200,
    msg: '成功！',
    data: '22222'
  })
})
router.post('/test', upload.single('file'), function(req, res, next) {
  let file = req.file
  // console.log(file)
  res.json({ message: 'ok' })
})

module.exports = router
