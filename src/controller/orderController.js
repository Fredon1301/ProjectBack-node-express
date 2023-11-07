const Order = require('../models/Order');
const User = require('../models/User');
const Book = require('../models/Book');
const jwtService = require('jsonwebtoken');
const OrderCounter = require('../models/OrderCounter');

async function generateOrderCode() {
  const orderCounter = await OrderCounter.findOneAndUpdate({}, { $inc: { count: 1 } }, { new: true, upsert: true });
  return orderCounter.count;
}
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
  getOrder: async (req, res) => {
    try {
      const cpf = req.body.cpf;
      const codBook = req.body.codBook;

      const user = await User.findOne({ cpf });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      
      const Book = await Book.findOne({ codBook });

      if (!Book) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      
      const order = await Order.findOne({ userId: user._id, bookId: book._id });

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
        const { cpf, codBook } = req.body;

        const user = await User.findOne({ cpf });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        const book = await Book.findOne({ codBook });

        if (!book || book.quantity < 1) {
            return res.status(404).json({ message: "Compra não efetuada" });
        }


        const codOrder = await generateOrderCode();

        const newOrder = await Order.create({
            codOrder: codOrder,
            userId: user._id,
            userAttributes: {
                name: user.name,
                cpf: user.cpf,
                email: user.email,
            },
            bookId: book._id,
            bookAttributes: {
                name: book.name,
                descBook: book.descBook,
                bookType: book.bookType,
                currentPrice: book.currentPrice,
                expirationDate: book.expirationDate,
                codBook: book.codBook,
                quantity: 1
            },
        });

        res.status(201).json({ message: "O pedido foi criado com sucesso", order: newOrder });
    } catch (err) {
        res.status(500).json({ message: `Não foi possível criar o pedido: ${err.message}` });
    }
  },
};
