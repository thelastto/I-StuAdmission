const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ChannelSchema = new Schema({
  category: {
    type: String
  },
  name: {
    type:String,
    require:true,
    unique:true
  },
  email:　{
    type: String,
    default: ''
  },
  linkman: {
    type: String
  },
  phone: {
    type: String
  },
  notes: {
      type: String
  },
});

module.exports = mongoose.model('Channel', ChannelSchema);