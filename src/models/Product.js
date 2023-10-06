const mongoose = require('mongoose')

const Schema = mongoose.Schema


const productSchema = new Schema({

    name: {type: String, required: true},
    productType: {type: String, required: true},
    currentPrice: {type: Number, required: true},
    expirationDate: {type: String, required: false},
    codProduct: {type: String, unique: true, required: true},
    quantity: {type: Number, required: true}


    

})

module.exports = mongoose.model("Product", productSchema)