const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  sNumber:{
    type:String,
    unique: true,
    require: true // 不可为空约束
  },
  name: {
    type: String,
    require: true // 不可为空约束
  },
  gender: {
    type: String,
  },
  major:{
      type:String,
      require:true
  },
  class:{
    type:String,
  },
  email: {
    type: String
  },
  phone: {
    type: String
  },
  notes:{
    type:String
  },
  file:{
    type:String
  }

});


module.exports = mongoose.model('Student', StudentSchema);