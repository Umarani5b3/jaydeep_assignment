
/**
 * Created by Jaydeep on 6/27/2018.
 */
const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp');
const favoriteSchema = new mongoose.Schema({
  user_id:{type : mongoose.Schema.Types.ObjectId, ref:'User'},
  books:{ type : Array , "default" : [] }      //books model not available to created 1 to many with embbadded associatiation
});
favoriteSchema.plugin(timestamps);
module.exports = mongoose.model('Favorite', favoriteSchema);
