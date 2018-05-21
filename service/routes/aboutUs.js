
var express = require('express');
var router = express.Router();

import cookieParser from 'cookie-parser'

import Aboutus from '../models/aboutus.js'
/*
  修改/添加about US
*/
router.post('/updateAboutUS',function(req,res,next){
     Aboutus.findOne({_id:req.body.id},function (err, aboutUs) {
        console.log(aboutUs);
        if(aboutUs){
            aboutUs.lastEditBy= JSON.parse(req.cookies.user).name;
            aboutUs.lastEditDate = new Date();
            aboutUs.content = req.body.content;
            aboutUs.save(function (err,doc) {
                if(!doc){
                  res.json({code:2,message:'失败，请稍后再试'})
                }else{
                  res.json({code:0,message:'修改成功'})
                }
              });
            
        }else{
            new Aboutus({
                name: req.body.name,
                content : req.body.content,
                createBy : JSON.parse(req.cookies.user).name,
                createDate : new Date(),
                lastEditBy :JSON.parse(req.cookies.user).name,
                lastEditDate: new Date()
            }).save(function (err,doc) {
                  if(!doc){
                    res.json({code:2,message:'失败，请稍后再试'})
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
  获取about US
*/
router.post('/getAboutUS',function(req,res,next){
    let total = 0;
     Aboutus.find({name:req.body.name}).count().exec().then(count=>{
        console.log(count);
        total=count;
         Aboutus.find({name:req.body.name}).sort({lastEditDate:-1}).limit(req.body.pageSize).skip((req.body.page-1)*req.body.pageSize).exec().then(aboutUSList=>{
             res.json({code:0,message:'success',total:total,aboutUSList:aboutUSList})
         }).catch(err=>{
             console.log(err)
         })
     }).catch(err=>{
         console.log(err)
     });
    
   
})
/*
  获取about US页面
*/
router.post('/getAboutUsPage',function(req,res,next){
     Aboutus.findOne({name:req.body.name,isApply:true},function(err,doc){
        res.json({code:0,message:'success',content:doc.content})

     })
     .catch(err=>{
         console.log(err)
     });
    
   
})
/*
  获取about SCIE的具体内容
*/
router.post('/getAboutUSDetail',function(req,res,next){
    
     Aboutus.findOne({_id:req.body.id},function (err, aboutUs){
        if(!aboutUs){
            res.json({code:2,message:'查询失败'})
        }else{
            console.log(aboutUs)
            res.json({code:0,message:'查询成功',content:aboutUs.content})
        }
     }).catch(err=>{
         console.log(err)
     });
    
   
})
/*
  删除aboutSCIE
*/
router.post('/removeAboutUS',function(req,res,next){
    
    Aboutus.remove({_id:req.body.id},function (err){
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
  应用about SCIE
*/
router.post('/applyAboutUS',function(req,res,next){
    
    Aboutus.update({name:req.body.name,isApply:true},{$set: {isApply: false}},{multi:true}).then(aboutUs=>{
        Aboutus.update({_id:req.body.id},{$set: {isApply: true}},function(err,doc){
            if(err){
               res.json({code:2,message:'失败，请稍后再试'});
            }else{
               res.json({code:0,message:'操作成功'});
            }
        })
        
    }).catch(err=>{
        console.log(err)
    })
    
   
  
})
/*
  批量删除about us
*/
router.post('/batchDeleteAboutUS',function(req,res,next){
    let aboutUSList = req.body.aboutUSList;
    let errContent = '';
    for(let i = 0; i < aboutUSList.length; i++){
        Aboutus.remove({_id:aboutUSList[i]._id},function (err){
            if(err){
                errContent = aboutUSList[i].content
            }  
         }).catch(err=>{
             console.log(err)
         });
    }
    if(errContent){
        res.json({code:2,message:'删除'+errContent.replace(/<[^>]+>/g,"")+ '时产生错误'})
    }else{
        res.json({code:0,message:'删除成功'})
    }
   
   
  
})
module.exports = router;