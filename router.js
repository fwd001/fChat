var router = require('express').Router()

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

module.exports = router
