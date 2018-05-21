const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewsSchema = new Schema({
  title: { // 新闻标题
    type: String
  },
  content : { // 新闻内容
    type: String
  },
  image : { // 封面图片
    type: String 
  },
  createBy: {
    type: String
  },
  createDate :{
    type: Date,
    require: true,
    default: Date.now
  },
  lastEditBy : {
    type: String
  },
  lastEditDate: {
    type: Date,
    require: true,
    default: Date.now 
  },
  slide: {
    type:Boolean,
    default:false
  }
  
});

module.exports = mongoose.model('News', NewsSchema);