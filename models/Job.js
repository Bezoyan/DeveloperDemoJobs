const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create JobSchema

const JobSchema = new Schema ({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  title: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  requirements:{
    type: [String],
    required: true
  },
  aboutCompany: {
    type: String
  },
  name: {
    type: String
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Job = mongoose.model('jobs', JobSchema);
