const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    codOrder: { type: Number, required: true },

    userAttributes: {
        type: Schema.Types.Mixed
    },
    bookAttributes: {
        type: Schema.Types.Mixed
    }
});

module.exports = mongoose.model("Order", orderSchema);
