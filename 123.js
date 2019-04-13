//图片上传
$(".newFile").on('change', function(e){
  var fileObj = e.currentTarget.files[0]; // js 获取文件对象
  var name = e.currentTarget.files[0].name;
  $(".newFile").parents("div.col-sm-10").find("input[name='newFileMsg']").attr("data-name",name);
  var url="/tbQuestion/uploadImg";

  var form = new FormData(); // FormData 对象
  form.append("file", fileObj); // 文件对象

  var xhr;
  xhr = new XMLHttpRequest();  // XMLHttpRequest 对象
  xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
  xhr.onload = uploadComplete; //请求完成
  xhr.onerror =  uploadFailed; //请求失败

  xhr.upload.onprogress = progressFunction;//【上传进度调用方法实现】
  xhr.upload.onloadstart = function(){//上传开始执行方法
      ot = new Date().getTime();   //设置上传开始时间
      oloaded = 0;//设置上传开始时，以上传的文件大小为0
  };
  xhr.send(form); //开始上传，发送form数据

  //显示进度条
  $("#myModal_add_progressBar_Module").css("display","block");
});

//上传成功响应
function uploadComplete(evt){
  //服务断接收完文件返回的结果
  //console.log(evt);
  var imgUrl = JSON.parse(evt.target.responseText);
  $(".newFile").parents("div.col-sm-10").find("input[name='newFileMsg']").val(imgUrl);
}
//上传失败
function uploadFailed(evt){
  parent.layer.msg("上传失败");
}
//上传进度实现方法，上传过程中会频繁调用该方法
function progressFunction(evt){
  // event.total是需要传输的总字节，event.loaded是已经传输的字节。如果event.lengthComputable不为真，则event.total等于0
  if (evt.lengthComputable){
      $("#myModal_add_progressBar").css("width",Math.round(evt.loaded / evt.total * 100) + "%");
      $("#myModal_add_progressBar").html(Math.round(evt.loaded / evt.total * 100) + "%");
      $("#percentage").html("已上传"+Math.round(evt.loaded / evt.total * 100) + "%");
  }
  var nt = new Date().getTime();//获取当前时间
  var pertime = (nt-ot)/1000; //计算出上次调用该方法时到现在的时间差，单位为s
  ot = new Date().getTime(); //重新赋值时间，用于下次计算
  var perload = evt.loaded - oloaded; //计算该分段上传的文件大小，单位b
  oloaded = evt.loaded;//重新赋值已上传文件大小，用以下次计算
  //上传速度计算
  var speed = perload/pertime;//单位b/s
  var bspeed = speed;
  var units = 'b/s';//单位名称
  if(speed/1024>1){
      speed = speed/1024;
      units = 'k/s';
  }
  if(speed/1024>1){
      speed = speed/1024;
      units = 'M/s';
  }
  speed = speed.toFixed(1);
  //剩余时间
  var resttime = ((evt.total-evt.loaded)/bspeed).toFixed(1);
  $("#time").html('，速度：'+speed+units+'，剩余时间：'+resttime+'s');
}