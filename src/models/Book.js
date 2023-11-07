const mongoose = require('mongoose')

const Schema = mongoose.Schema


const bookSchema = new Schema({

    name: {type: String, required: true},
    descBook: {type: String, required: false},
    bookType: {type: String, required: true},
    currentPrice: {type: Number, required: true},
    expirationDate: {type: String, required: false},
    codBook: {type: String, unique: true, required: true},
    quantity: {type: Number, required: true}


    

})

module.exports = mongoose.model("Book", bookSchema)