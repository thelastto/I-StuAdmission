const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
  name: {
    type: String,
    unique: true, // 不可重复约束
    require: true // 不可为空约束
  },
  gender: {
    type: String,
    require: true
  },
  major:{
      type:Number,
      require:true
  },
  class:{
    type:String,
    required:true
  },
  email: {
    type: String
  },
  phone: {
    type: String
  }
});


module.exports = mongoose.model('Student', StudentSchema);