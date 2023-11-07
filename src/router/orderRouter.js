'use strict'


const express = require('express')
const orderRouter = express.Router()

const orderController = require('../controller/orderController')


orderRouter.route('/api/order')
  .get((req, res) => orderController.getOrders(req, res))
  .post((req, res) => orderController.createOrder(req, res))
  .put((req, res) => orderController.updateOrder(req, res))
  .delete((req, res) => orderController.deleteOrderById(req, res))
  .get((req, res) => orderController.getOrder(req, res));




module.exports = orderRouter
