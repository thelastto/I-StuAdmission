
var express = require('express');
var router = express.Router();

import Aboutus from '../models/aboutus.js'
/*
  修改/添加about SCIE
*/
router.post('/updateAboutSCIE',function(req,res,next){
    console.log(req.body);
     Aboutus.findOne({_id:req.body.id},function (err, aboutUs) {
        console.log(aboutUs);
        if(aboutUs){
            aboutUs.lastEditBy= req.body.username;
            aboutUs.lastEditDate = new Date();
            aboutUs.content = req.body.content;
            aboutUs.save(function (err,doc) {
                if(!doc){
                  res.json({code:1,message:'失败，请稍后再试'})
                }else{
                  res.json({code:0,message:'修改成功'})
                }
              });
            
        }else{
            new Aboutus({
                name: req.body.name,
                content : req.body.content,
                createBy : req.body.username,
                createDate : new Date(),
                lastEditBy :req.body.username,
                lastEditDate: new Date()
            }).save(function (err,doc) {
                  if(!doc){
                    res.json({code:1,message:'失败，请稍后再试'})
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
  获取about SCIE
*/
router.post('/getAboutSCIE',function(req,res,next){
    let total = 0;
     Aboutus.find({name:'aboutSCIE'}).count().exec().then(count=>{
        console.log(count);
        total=count;
         Aboutus.find({name:'aboutSCIE'}).sort({lastEditDate:-1}).limit(req.body.pageSize).skip((req.body.page-1)*req.body.pageSize).exec().then(aboutSCIEList=>{
             res.json({code:0,message:'success',total:total,aboutSCIEList:aboutSCIEList})
         }).catch(err=>{
             console.log(err)
         })
     }).catch(err=>{
         console.log(err)
     });
    
   
})
/*
  获取about SCIE的具体内容
*/
router.post('/getAboutSCIEDetail',function(req,res,next){
    
     Aboutus.findOne({_id:req.body.id},function (err, aboutUs){
        if(!aboutUs){
            res.json({code:1,message:'查询失败'})
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
router.post('/removeAboutSCIE',function(req,res,next){
    
    Aboutus.remove({_id:req.body.id},function (err){
       if(err){
           res.json({code:1,message:'删除失败'})
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
router.post('/applyAboutSCIE',function(req,res,next){
    
    Aboutus.update({isApply:true},{$set: {isApply: false}},{multi:true}).catch(err=>{
        console.log(err)

    });
    Aboutus.update({_id:req.body.id},{$set: {isApply: true}},function(err,doc){
        if(err){
           res.json({code:1,message:'失败，请稍后再试'});
        }else{
           res.json({code:0,message:'操作成功'});
        }
    })
   
  
})
module.exports = router;