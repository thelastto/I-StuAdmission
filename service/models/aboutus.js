const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AboutusSchema = new Schema({
  aboutSCIE: {
    type: String
  },
  contactUs: {
    type: String
  }
});

module.exports = mongoose.model('Aboutus', AboutusSchema);