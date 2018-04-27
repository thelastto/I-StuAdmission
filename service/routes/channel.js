
var express = require('express');
var router = express.Router();

import Channel from '../models/channel.js'
/*
  获取招生渠道列表
*/
router.post('/getChannelList',function(req,res,next){
    let total = 0;
     Channel.find({category:req.body.category}).count().exec().then(count=>{
        console.log(count);
        total=count;
        Channel.find({category:req.body.category}).limit(req.body.pageSize).skip((req.body.page-1)*req.body.pageSize).exec().then(channelList=>{
             res.json({code:0,message:'success',total:total,channelList:channelList})
         }).catch(err=>{
             console.log(err)
         })
     }).catch(err=>{
         console.log(err)
     });
    
   
})
/*
  获取招生渠道的具体内容
*/
router.post('/getChannelDetail',function(req,res,next){
    
    Channel.findOne({_id:req.body.id},function (err, channel){
       if(!channel){
           res.json({code:1,message:'查询失败'})
       }else{
           res.json({code:0,message:'查询成功',channel:channel})
       }
    }).catch(err=>{
        console.log(err)
    });
})
/*
  修改/添加招生渠道
*/
router.post('/updateChannel',function(req,res,next){
     Channel.findOne({_id:req.body.id},function (err, channel) {
        if(channel){
            channel.name= req.body.channelform.name;
            channel.linkman = req.body.channelform.linkman;
            channel.phone = req.body.channelform.phone;
            channel.email = req.body.channelform.email;
            channel.notes = req.body.channelform.notes;
            channel.save(function (err,doc) {
                if(!doc){
                  res.json({code:1,message:'失败，请稍后再试'})
                }else{
                  res.json({code:0,message:'修改成功'})
                }
              });
            
        }else{
            new Channel({
                category: req.body.channelform.category,
                name: req.body.channelform.name,
                linkman : req.body.channelform.linkman,
                phone : req.body.channelform.phone,
                email : req.body.channelform.email,
                notes :req.body.channelform.notes,
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
  删除招生渠道
*/
router.post('/removeChannel',function(req,res,next){
    
    Channel.remove({_id:req.body.id},function (err){
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
  批量删除招生渠道
*/
router.post('/batchDeleteChannel',function(req,res,next){
    let channelList = req.body.channelList;
    let errList = [];
    for(let i = 0; i < channelList.length; i++){
        Channel.remove({_id:channelList[i]._id},function (err){
            if(err){
                errList.push(channelList[i].name)
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