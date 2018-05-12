
var express = require('express');
var router = express.Router();
var multipart = require('connect-multiparty');

var multipartMiddleware = multipart();

import XLSX from 'xlsx';
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
            student.gender = req.body.stuform.gender;
            student.major = req.body.stuform.major;
            student.class = req.body.stuform.class;
            student.email = req.body.stuform.email;
            student.phone = req.body.stuform.phone;
            student.notes = req.body.stuform.notes;
            student.save(function (err,doc) {
                if(!doc){
                  res.json({code:1,message:'修改失败'})
                }else{
                  res.json({code:0,message:'修改成功'})
                }
              });
            
        }else{
            Student.findOne({sNumber:req.body.stuform.sNumber},function(err, student){
                if(student){
                    res.json({code:1,message:'该学号已存在'})
                    
                }else{
                    new Student({
                        sNumber : req.body.stuform.sNumber,
                        name : req.body.stuform.name,
                        gender: req.body.stuform.gender,
                        major : req.body.stuform.major,
                        class : req.body.stuform.class,
                        email : req.body.stuform.email,
                        phone : req.body.stuform.phone,
                        notes : req.body.stuform.notes
                    }).save(function (err,doc) {
                        if(err){
                            res.json({code:1,message:'添加失败'})
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
  获取留学生列表
*/
router.post('/getStuList',function(req,res,next){
    let total = 0;
    const reg = new RegExp(req.body.keywords, 'i')
    if(req.body.pageSize){
        Student.find({
            $or : [ //多条件，数组
                {sNumber : {$regex : reg}},
                {name : {$regex : reg}},
                {major : {$regex : reg}}
            ]}).count().exec().then(count=>{
            console.log(count);
            total=count;
             Student.find({
                $or : [ //多条件，数组
                    {sNumber : {$regex : reg}},
                    {name : {$regex : reg}},
                    {major : {$regex : reg}}
                ]}).sort({sNumber:1}).limit(req.body.pageSize).skip((req.body.page-1)*req.body.pageSize).exec().then(stuList=>{
                 res.json({code:0,message:'success',total:total,stuList:stuList})
             }).catch(err=>{
                 console.log(err)
             })
         }).catch(err=>{
             console.log(err)
         });
    }else{
        Student.find({
            $or : [ //多条件，数组
                {sNumber : {$regex : reg}},
                {name : {$regex : reg}},
                {major : {$regex : reg}}
            ]},function(err,doc){
                res.json({code:0,message:'success',total:total,stuList:doc})
            }
        )
    }
   
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
/*
  导入
*/
router.post('/saveStuFromFile', multipartMiddleware,function(req,res){
    const workbook = XLSX.readFile(req.files.file.path);
    // 获取 Excel 中所有表名
    const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
    // 根据表名获取对应某张表
    const worksheet = workbook.Sheets[sheetNames[0]];
    const result = XLSX.utils.sheet_to_json(worksheet);
    let errline = -1;
    for(let i = 0; i < result.length; i++){
        if(!result[i].学号||!result[i].姓名||!result[i].专业){
            errline = i;
            break;
        }
        Student.update({sNumber:result[i].学号},
            {name:result[i].姓名,gender:result[i].gender||'',
            major:result[i].专业,class:result[i].班级||'',
            email:result[i].邮箱||'',phone:result[i].手机||'',notes:result[i].备注||''},
            {upsert:true},function(err){
                if(err){
                    errline = i;
                    console.log(err);
                }
            });
    }
    if(errline<0){
        res.json({code:0,message:'导入成功'})
    }else{
        res.json({code:1,message:'填写错误！',err:result[errline]})
    }
}),
/*
  导出
*/
router.get('/export',function(req,res,next){
    let _headers = ['sNumber', 'name', 'gender', 'major', 'class', 'email', 'phone', 'notes']
    Student.find({},{'_id':0,'file':0,'_v':0}).then(stuList=>{
        let headers ={ 
            A1: { v: '学号' },
            B1: { v: '姓名' },
            C1: { v: '性别' },
            D1: { v: '专业' },
            E1: { v: '班级' },
            F1: { V: '邮箱' },
            G1: { v: '手机' },
            H1: { v: '备注' }
        }

        let data = stuList
        .map((v, i) => _headers.map((k, j) => Object.assign({}, { v: v[k], position: String.fromCharCode(65+j) + (i+2) })))
        .reduce((prev, next) => prev.concat(next))
        .reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v}}), {});
        // 合并 headers 和 data
        var output = Object.assign({}, headers, data)
        // 获取所有单元格的位置
        var outputPos = Object.keys(output);
        // 计算出范围
        var ref = outputPos[0] + ':' + outputPos[outputPos.length - 1];
        // 构建 workbook 对象
        var wb = {
            SheetNames: ['mySheet'],
            Sheets: {
                  'mySheet': Object.assign({}, output, { '!ref': ref })
            }
        };
        // 导出 Excel
        XLSX.writeFile(wb, 'public/downloads/信息学院留学生信息汇总表.xlsx');
        res.download('public/downloads/信息学院留学生信息汇总表.xlsx');
    }).catch(err=>{
        res.json({code:1,message:'导出错误'})
    });
  
}),
/*
  批量删除留学生
*/
router.post('/batchDeleteStu',function(req,res,next){
    let stuList = req.body.stuList;
    let errList = [];
    for(let i = 0; i < stuList.length; i++){
        Student.remove({_id:stuList[i]._id},function (err){
            if(err){
                errList.push(stuList[i].sNumber)
            }  
         }).catch(err=>{
             console.log(err)
         });
    }
    if(errList.length>0){
        res.json({code:1,message:'删除完成，其中学号为'+errList+'的留学生删除失败'})
    }else{
        res.json({code:0,message:'删除成功'})
    }
   
   
  
}),
module.exports = router;