const product = require('../models/Product');
const jwtService = require('jsonwebtoken');

module.exports = {
    getProduct: (req, res) => {
        product.find({}).select(["-__v", "-_id"]).then((result) => {
            res.status(200).json(result);
        }).catch(() => {
            res.status(500).json({ message: "Não foi possível recuperar os produtos" });
        });
    },
    deleteProduct: async (req, res) => {
        try {
            const result = await product.deleteOne({ codProduct: req.body.codProduct });
            if (result.deletedCount > 0) {
                res.status(200).json({ message: "Produto removido com sucesso" });
            } else {
                res.status(404).json({ message: "Produto não encontrado para remoção" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível remover o produto" });
        }
    },
    getProducts: async (req, res) => {
        try {
             const result = await product.findOne({ codProduct: req.body.codProduct });
             if (!result) {
                 res.status(404).json({ message: "Produto não encontrado" });
             } else {
                 res.status(200).json(result);
             }
         } catch (err) {
             res.status(500).json({ message: "Não foi possível recuperar o produto no momento" });
        }
  },
    updateProduct: async (req, res) => {
        try {
            const result = await product.updateOne({ codProduct: req.body.codProduct}, req.body);
            if (result.modifiedCount> 0) {
                res.status(200).json({ message: "Produto atualizado com sucesso" });
            } else {
                res.status(404).json({ message: "Produto não encontrado para atualização" });
            }
        } catch (err) {
            res.status(500).json({ message: "Não foi possível atualizar os dados" });
        }
    },
    createProduct: async (req, res) => {
        try {
            const result = await product.create(req.body);
            res.status(201).json({ message: `O produto ${result._doc.name} foi criado com sucesso` });
        } catch (err) {
            res.status(500).json({ message: `Não foi possível criar o produto ${req.body.name}` });
        }
    },
};
