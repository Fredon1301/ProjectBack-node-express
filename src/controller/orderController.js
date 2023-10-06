const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const jwtService = require('jsonwebtoken');

module.exports = {
  getOrders: (req, res) => {
    Order.find({}).select(["-__v", "-_id"]).then((result) => {
      res.status(200).json(result);
    }).catch(() => {
      res.status(500).json({ message: "Não foi possível recuperar os pedidos" });
    });
  },
  deleteOrderById: async (req, res) => {
    try {
      const result = await Order.deleteOne({ codOrder: req.params.id });
      if (result.deletedCount > 0) {
        res.status(200).json({ message: "Pedido removido com sucesso" });
      } else {
        res.status(404).json({ message: "Pedido não encontrado para remoção" });
      }
    } catch (err) {
      res.status(500).json({ message: "Não foi possível remover o pedido" });
    }
  },
  getOrders: async (req, res) => {
    try {
      const cpf = req.params.cpf;
      const codProduct = req.params.codProduct;

      const user = await User.findOne({ cpf });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      
      const product = await Product.findOne({ codProduct });

      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      
      const order = await Order.findOne({ userId: user._id, productId: product._id });

      if (!order) {
        return res.status(404).json({ message: "Pedido não encontrado" });
      }

      res.status(200).json(order);
    } catch (err) {
      res.status(500).json({ message: "Não foi possível recuperar o pedido no momento" });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const result = await Order.updateOne({ codOrder: req.body.codOrder }, req.body);
      if (result.modifiedCount > 0) {
        res.status(200).json({ message: "Pedido atualizado com sucesso" });
      } else {
        res.status(404).json({ message: "Pedido não encontrado para atualização" });
      }
    } catch (err) {
      res.status(500).json({ message: "Não foi possível atualizar os dados" });
    }
  },
  createOrder: async (req, res) => {
    try {
      const { cpf, codProduct } = req.body;
  
     
      const user = await User.findOne({ cpf });
  
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
  
      
      const product = await Product.findOne({ codProduct });
  
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
  
      
      const newOrder = await Order.create({
        userId: user._id,
        userAttributes: {
          name: user.name,
          cpf: user.cpf,
        
        },
        productId: product._id,
        productAttributes: {
          name: product.name,
          productType: product.productType,
          currentPrice: product.currentPrice,
          expirationDate: product.expirationDate,
          codProduct: product.codProduct,

        },

      });
  
      res.status(201).json({ message: `O pedido foi criado com sucesso`, order: newOrder });
    } catch (err) {
      res.status(500).json({ message: `Não foi possível criar o pedido: ${err.message}` });
    }
  },
};