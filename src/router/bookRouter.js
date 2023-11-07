'use strict'


const express = require('express')
const BookRouter = express.Router()

const BookController = require('../controller/bookController')


BookRouter.route('/api/book')
.get((req, res) => BookController.getBook(req, res))
.post((req, res) => BookController.createBook(req, res))
.put((req, res) => BookController.updateBook(req, res))
.delete((req, res) => BookController.deleteBook(req, res))


BookRouter.route('/api/book/:id')
.get((req, res) => BookController.getBooks(req, res))



module.exports = BookRouter
