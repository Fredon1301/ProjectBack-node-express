const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  userAttributes: {
    type: Schema.Types.Mixed
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  productAttributes: {
    type: Schema.Types.Mixed
  },


});

module.exports = mongoose.model("Order", orderSchema);
