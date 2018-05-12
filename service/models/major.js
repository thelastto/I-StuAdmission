const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MajorSchema = new Schema({
  name: {
    type: String,
    require: true // 不可为空约束
  },
  detail: {
    type: String,
    require: true // 不可为空约束
  }

});


module.exports = mongoose.model('Major', MajorSchema);
