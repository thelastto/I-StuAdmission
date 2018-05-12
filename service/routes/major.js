
var express = require('express');
var router = express.Router();

import Major from '../models/major.js'
/*
  获取major列表
*/
router.post('/getMajorList',function(req,res,next){
    let total = 0;
     Major.find({}).count().exec().then(count=>{
        console.log(count);
        total=count;
        Major.find({}).limit(req.body.pageSize).skip((req.body.page-1)*req.body.pageSize).exec().then(majorList=>{
             res.json({code:0,message:'success',total:total,majorList:majorList})
         }).catch(err=>{
             console.log(err)
         })
     }).catch(err=>{
         console.log(err)
     });
    
   
})
/*
  添加major
*/
router.post('/addMajor',function(req,res,next){
    Major.findOne({name:req.body.name},function (err, major) {
       if(major){
           res.json({code:1,message:'添加失败，该专业信息已经存在'})
           
       }else{
           new Major({
               name: req.body.name,
               detail: req.body.detail
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

router.post('/updateMajor',function(req,res,next){
     Major.findOne({_id:req.body.majorForm._id},function (err, major) {
        if(major){
            major.name= req.body.majorForm.name;
            major.detail= req.body.majorForm.detail;
            major.save(function (err,doc) {
                if(!doc){
                  res.json({code:1,message:'失败，请稍后再试'})
                }else{
                  res.json({code:0,message:'修改成功'})
                }
              });
            
        }else{
            res.json({code:1,message:'修改失败'})
            
        }
    }).catch(err=>{
        console.log(err)
    });
    
   
})
/*
  删除major
*/
router.post('/removeMajor',function(req,res,next){
    
    Major.remove({_id:req.body.id},function (err){
       if(err){
           res.json({code:1,message:'删除失败'})
       }else{
           res.json({code:0,message:'删除成功'})
       }
    }).catch(err=>{
        console.log(err)
    });
   
  
})
/*
  批量删除major
*/
router.post('/batchDeleteMajor',function(req,res,next){
    let majorList = req.body.majorList;
    let errList = [];
    for(let i = 0; i < majorList.length; i++){
        Major.remove({_id:majorList[i]._id},function (err){
            if(err){
                errList.push(majorList[i].name)
            }  
         }).catch(err=>{
             console.log(err)
         });
    }
    if(errList.length>0){
        res.json({code:1,message:'删除完成，其中'+errList+'删除失败'})
    }else{
        res.json({code:0,message:'删除成功'})
    }
   
   
  
}),
module.exports = router;