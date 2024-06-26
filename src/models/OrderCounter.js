
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderCounterSchema = new Schema({
    count: { type: Number, default: 0 }
});

module.exports = mongoose.model("OrderCounter", orderCounterSchema);
