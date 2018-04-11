
var express = require('express');
var router = express.Router();

import Aboutus from '../models/aboutus.js'
/*
  修改about SCIE
*/
router.post('/updateAboutSCIE',function(req,res,next){
    console.log(req.body);
     Aboutus.findOne({},function (err, aboutUs) {
        console.log(err);
        console.log(aboutUs);
        if(aboutUs){
            aboutUs.aboutSCIE = req.body.aboutSCIE;
            aboutUs.save();
            res.json({code:0,message:'修改成功'})
        }else{
            new Aboutus({
                aboutSCIE:req.body.aboutSCIE,
                contactUs:''
            }).save();
            res.json({code:0,message:'修改成功'})
        }
    }).catch(err=>{
        console.log(err)
    });
    
   
})

/*
  获取about SCIE
*/
router.get('/getAboutSCIE',function(req,res,next){
    console.log(req.body);
     Aboutus.findOne({},function (err, aboutUs) {
        console.log(err);
        console.log(aboutUs);
        res.json({code:0,message:'success',aboutSCIE:aboutUs.aboutSCIE||''})

    }).catch(err=>{
        console.log(err)
    });
    
   
})

module.exports = router;