var router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const db = require("./db");
const { getJsonFiles, delOneFile } = require("./tool");

const uploadFolder = "uploads/";
// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    const filename = Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null, Date.now() + "---" + filename);
  },
});

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage });

//获取所有的文件下载列表
router.get("/fileList", function (req, res) {
  const list = getJsonFiles();
  //获取到所有的新闻的数据，把数据响应给浏览器
  res.send({
    code: 200,
    msg: "成功！",
    data: list,
  });
});

// 上传文件
router.post("/update", upload.single("file"), function (req, res, next) {
  let file = req.file;
  newFileName = file.filename
  delOneFile(file.filename);
  res.json({ message: "上传内容24小时后自动删除" });
});

// 下载
router.get("/download", function (req, res, next) {
  const name = req.query.name;
  const downName = name.split("---")[1];
  // console.log(downName);
  //第二种方式
  var curPath = path.join(__dirname, uploadFolder, name);
  var f = fs.createReadStream(curPath);

  res.writeHead(200, {
    "Content-Type": "application/force-download",
    "Content-Disposition": `attachment; filename=${encodeURI(downName)}`,
  });
  f.pipe(res);
});

// 删除文件
router.get("/del", function (req, res) {
  console.log(req.query);
  fs.unlink(path.join(__dirname, uploadFolder, req.query.name), function (err) {
    const list = getJsonFiles();
    const data = { data: list };
    if (err) {
      data.code = 500;
      data.msg = "删除失败";
    } else {
      data.code = 200;
      data.msg = "删除成功";
    }
    res.send(data);
  });

  //获取到所有的新闻的数据，把数据响应给浏览器
});

router.get("/deleteAllChat", (req, res) => {
  db.deleteAll(() => {
    // console.log('删除成功')
    res.send({
      code: 200,
      msg: "删除成功",
      data: {},
    });
  });
});

module.exports = router;
