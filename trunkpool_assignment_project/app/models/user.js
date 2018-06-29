/**
 * Created by Jaydeep on 6/27/2018.
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const timestamps = require('mongoose-timestamp');
const userSchema = new mongoose.Schema({
  id:String,
  token:String,
  email:String,
  name:String
});
userSchema.plugin(timestamps);
module.exports = mongoose.model('User', userSchema);
