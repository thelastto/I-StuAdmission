
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();

import XLSX from 'xlsx';
import News from '../models/news.js'
/*
  修改/添加新闻信息
*/
router.post('/updateNews',function(req,res,next){
     News.findOne({_id:req.body.id},function (err, news) {
        console.log(news);
        if(news){
            news.title = req.body.newsform.title;
            news.image = req.body.newsform.image;
            news.content = req.body.newsform.content;
            news.createBy = JSON.parse(req.cookies.user).name;
            news.createDate = new Date();
            news.lastEditBy =JSON.parse(req.cookies.user).name;
            news.lastEditDate =  new Date();
            news.slide = req.body.newsform.slide;
            news.save(function (err,doc) {
                if(!doc){
                  res.json({code:2,message:'修改失败'})
                }else{
                  res.json({code:0,message:'修改成功'})
                }
              });
            
        }else{
            new News({
                title : req.body.newsform.title,
                image : req.body.newsform.image,
                content : req.body.newsform.content,
                createBy : JSON.parse(req.cookies.user).name,
                createDate : new Date(),
                lastEditBy : JSON.parse(req.cookies.user).name,
                lastEditDate :  new Date(),
                slide : req.body.newsform.slide
            }).save(function (err,doc) {
                if(err){
                    res.json({code:2,message:'添加失败'})
                }else{
                    res.json({code:0,message:'添加成功'})
                }
                    
            });
                
            
            
        }
    }).catch(err=>{
        console.log(err)
    });
})
/*
  获取新闻列表
*/
router.post('/getNewsList',function(req,res,next){
    let total = 0;
    const reg = new RegExp(req.body.keywords, 'i')
    if(req.body.pageSize){
        News.find({
            $or : [ //多条件，数组
                {title : {$regex : reg}},
                {createBy : {$regex : reg}},
                {lastEditBy : {$regex : reg}}
            ]}).count().exec().then(count=>{
            console.log(count);
            total=count;
             News.find({
                $or : [ //多条件，数组
                    {title : {$regex : reg}},
                {createBy : {$regex : reg}},
                {lastEditBy : {$regex : reg}}
                ]}).sort({sNumber:1}).limit(req.body.pageSize).skip((req.body.page-1)*req.body.pageSize).exec().then(newsList=>{
                 res.json({code:0,message:'success',total:total,newsList:newsList})
             }).catch(err=>{
                 console.log(err)
             })
         }).catch(err=>{
             console.log(err)
         });
    }else{
        News.find({
            $or : [ //多条件，数组
                {title : {$regex : reg}},
                {createBy : {$regex : reg}},
                {lastEditBy : {$regex : reg}}
            ]},function(err,doc){
                res.json({code:0,message:'success',total:total,newsList:doc})
            }
        )
    }
   
})
/*
  获取新闻具体信息
*/
router.post('/getNewsDetail',function(req,res,next){
    News.findOne({_id:req.body.id},function (err, news){
       if(!news){
           res.json({code:2,message:'查询错误！'})
       }else{
           res.json({code:0,message:'查询成功',news:news})
       }
    }).catch(err=>{
        console.log(err)
    });
   
  
})
/*
  删除新闻
*/
router.post('/removeNews',function(req,res,next){
    
    News.remove({_id:req.body.id},function (err){
       if(err){
           res.json({code:2,message:'删除失败'})
       }else{
           res.json({code:0,message:'删除成功'})
       }
    }).catch(err=>{
        console.log(err)
    });
   
  
}),

/*
  批量删除新闻
*/
router.post('/batchDeleteNews',function(req,res,next){
    let newsList = req.body.newsList;
    let errList = [];
    for(let i = 0; i < newsList.length; i++){
        News.remove({_id:newsList[i]._id},function (err){
            if(err){
                errList.push(newsList[i].sNumber)
            }  
         }).catch(err=>{
             console.log(err)
         });
    }
    if(errList.length>0){
        res.json({code:2,message:'删除完成，其中学号为'+errList+'的新闻删除失败'})
    }else{
        res.json({code:0,message:'删除成功'})
    }
   
   
  
}),
module.exports = router;