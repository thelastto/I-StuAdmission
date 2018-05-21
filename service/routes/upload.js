var express = require('express');
var router = express.Router();
var formidable=require('formidable');//上传功能的插件
var multipart = require('connect-multiparty');
var path=require('path');
var fs=require('fs');

import cookieParser from 'cookie-parser'

router.post('/',function (req,res) {
    let uploadDir = '/uploads/';
    switch(req.query.type) { 
        case "news":
          uploadDir += 'news/';
          break;
        case "teacher":
          uploadDir += 'teacher/';
          break;
    }
    let form=new formidable.IncomingForm();
    //文件的编码格式
    form.encoding='utf-8';
    //文件的上传路径
    form.uploadDir='public'+uploadDir;
    //文件的后缀名
    form.extensions=true;
    //文件的大小限制
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.parse(req, function (err, fields, files) {
    var file=files.file;
    var oldpath =path.normalize(file.path);//返回正确格式的路径
    var newpath=uploadDir+JSON.parse(req.cookies.user).name+new Date().getTime();
      //将老的图片路径改为新的图片路径
      fs.rename(oldpath,'public'+newpath,function(err){
        if(err){
          console.error({code:2,message:'图片上传失败'});
        }
        else {
           res.send({code:0,message:'图片上传成功',url:'http://127.0.0.1:3002'+newpath})
        }
      });
    })
  });
  
  module.exports = router;