'use strict'

const mongoose = require('mongoose')
const cors = require('cors');   
const fs = require('fs')
const http = require('http')
const https = require('https')
require('dotenv').config()


mongoose.connect('mongodb://127.0.0.1:27017/Back-Biblioteca')

const express = require('express')


const app = express()

http.createServer(app).listen(3333)

const middlewareAuth = require('./src/middlewareAuth')
const userRouter = require('./src/router/userRouter')

const bookRouter = require('./src/router/bookRouter')
const orderRouter = require('./src/router/orderRouter')
const jwtService = require('jsonwebtoken')

app.use(cors());
// Cors serve pra liberar requisições para certas fontes (ps: se deixar vazio, tá liberado pra todo mundo)
app.use(express.json())
app.use(middlewareAuth)
app.use(userRouter)

app.use(bookRouter)
app.use(orderRouter)








//app.listen(port, () => {
//     console.log(`O servidor está executando na porta ${port}`)
// })
