
var express = require('express');
var router = express.Router();

import Student from '../models/student.js'
/*
  修改/添加留学生信息
*/
router.post('/updateStu',function(req,res,next){
    console.log(req.body);
     Student.findOne({_id:req.body.id},function (err, student) {
        console.log(student);
        if(student){
            student.sNumber = req.body.stuform.sNumber;
            student.name = req.body.stuform.name;
            student.major = req.body.stuform.major;
            student.email = req.body.stuform.email;
            student.notes = req.body.stuform.notes;
            student.save(function (err,doc) {
                if(!doc){
                  res.json({code:1,message:'失败，请稍后再试'})
                }else{
                  res.json({code:0,message:'修改成功'})
                }
              });
            
        }else{
            new Student({
                sNumber : req.body.stuform.sNumber,
                name : req.body.stuform.name,
                major : req.body.stuform.major,
                email : req.body.stuform.email,
                notes : req.body.stuform.notes
            }).save(function (err,doc) {
                  if(!doc){
                      console.log(err)
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
  获取留学生列表
*/
router.post('/getStuList',function(req,res,next){
    let total = 0;
     Student.find({}).count().exec().then(count=>{
        console.log(count);
        total=count;
         Student.find({}).sort({sNumber:1}).limit(req.body.pageSize).skip((req.body.page-1)*req.body.pageSize).exec().then(stuList=>{
             res.json({code:0,message:'success',total:total,stuList:stuList})
         }).catch(err=>{
             console.log(err)
         })
     }).catch(err=>{
         console.log(err)
     });
    
   
})
/*
  获取留学生具体信息
*/
router.post('/getStuDetail',function(req,res,next){
    
    Student.findOne({_id:req.body.id},function (err, student){
       if(!student){
           res.json({code:1,message:'找不到该生信息，请刷新后重试'})
       }else{
           res.json({code:0,message:'查询成功',stu:student})
       }
    }).catch(err=>{
        console.log(err)
    });
   
  
})
/*
  删除留学生
*/
router.post('/removeStu',function(req,res,next){
    
    Student.remove({_id:req.body.id},function (err){
       if(err){
           res.json({code:1,message:'删除失败'})
       }else{
           res.json({code:0,message:'删除成功'})
       }
    }).catch(err=>{
        console.log(err)
    });
   
  
}),
module.exports = router;