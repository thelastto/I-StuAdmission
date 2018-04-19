const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AboutusSchema = new Schema({
  name: {
    type: String
  },
  content : {
    type: String
  },
  createBy : {
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
  isApply:{
    type:Boolean,
    default:false
  }
  
});

module.exports = mongoose.model('Aboutus', AboutusSchema);