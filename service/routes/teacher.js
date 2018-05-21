
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();
// 移动文件需要使用fs模块
var fs = require('fs');
import Teacher from '../models/teacher.js'
/*
  修改/添加教师信息
*/
router.post('/updateTeacher',function(req,res){
     Teacher.findOne({_id:req.body.id},function (err, teacher) {
        console.log(teacher);
        if(teacher){
            teacher.tNumber = req.body.teacherform.tNumber,
            teacher.name = req.body.teacherform.name,
            teacher.image = req.body.teacherform.image,
            teacher.professionalTitle = req.body.teacherform.professionalTitle,
            teacher.address = req.body.teacherform.address,
            teacher.email = req.body.teacherform.email,
            teacher.phone = req.body.teacherform.phone,
            teacher.notes = req.body.teacherform.notes
            teacher.save(function (err,doc) {
                if(!doc){
                  res.json({code:2,message:'修改失败'})
                }else{
                  res.json({code:0,message:'修改成功'})
                }
              });
            
        }else{
            Teacher.findOne({tNumber:req.body.teacherform.tNumber},function(err, teacher){
                if(teacher){
                    res.json({code:2,message:'该教师号已存在'})
                    
                }else{
                    new Teacher({
                        tNumber : req.body.teacherform.tNumber,
                        name : req.body.teacherform.name,
                        image : req.body.teacherform.image,
                        professionalTitle: req.body.teacherform.professionalTitle,
                        address: req.body.teacherform.address,
                        email : req.body.teacherform.email,
                        phone : req.body.teacherform.phone,
                        notes : req.body.teacherform.notes
                    }).save(function (err,doc) {
                        if(err){
                            res.json({code:2,message:'添加失败'})
                        }else{
                            res.json({code:0,message:'添加成功'})
                        }
                            
                    });
                }
            })
            
            
        }
    }).catch(err=>{
        console.log(err)
    });
})
/*
  获取教师列表
*/
router.post('/getTeacherList',function(req,res,next){
    let total = 0;
    const reg = new RegExp(req.body.keywords, 'i')
    if(req.body.pageSize){
        Teacher.find({
            $or : [ //多条件，数组
                {tNumber : {$regex : reg}},
                {name : {$regex : reg}},
                {professionalTitle : {$regex : reg}}
            ]}).count().exec().then(count=>{
            console.log(count);
            total=count;
             Teacher.find({
                $or : [ //多条件，数组
                    {tNumber : {$regex : reg}},
                    {name : {$regex : reg}},
                    {professionalTitle : {$regex : reg}}
                ]}).sort({sNumber:1}).limit(req.body.pageSize).skip((req.body.page-1)*req.body.pageSize).exec().then(teacherList=>{
                 res.json({code:0,message:'success',total:total,teacherList:teacherList})
             }).catch(err=>{
                 console.log(err)
             })
         }).catch(err=>{
             console.log(err)
         });
    }else{
        Teacher.find({
            $or : [ //多条件，数组
                {sNumber : {$regex : reg}},
                {name : {$regex : reg}},
                {major : {$regex : reg}}
            ]},function(err,doc){
                res.json({code:0,message:'success',total:total,teacherList:doc})
            }
        )
    }
     
    
   
})
/*
  获取教师具体信息
*/
router.post('/getTeacherDetail',function(req,res,next){
    Teacher.findOne({_id:req.body.id},function (err, teacher){
       if(!teacher){
           res.json({code:2,message:'找不到该教师信息，请刷新后重试'})
       }else{
           res.json({code:0,message:'查询成功',teacher:teacher})
       }
    }).catch(err=>{
        console.log(err)
    });
   
  
})
/*
  删除教师
*/
router.post('/removeTeacher',function(req,res,next){
    
    Teacher.remove({_id:req.body.id},function (err){
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
  批量删除教师
*/
router.post('/batchDeleteTeacher',function(req,res,next){
    let teacherList = req.body.teacherList;
    let errList = [];
    for(let i = 0; i < teacherList.length; i++){
        Teacher.remove({_id:teacherList[i]._id},function (err){
            if(err){
                errList.push(teacherList[i].sNumber)
            }  
         }).catch(err=>{
             console.log(err)
         });
    }
    if(errList.length>0){
        res.json({code:2,message:'删除完成，其中学号为'+errList+'的教师删除失败'})
    }else{
        res.json({code:0,message:'删除成功'})
    }
   
   
  
}),

router.post('/fileUpload', function(req, res) {
  

})
module.exports = router;