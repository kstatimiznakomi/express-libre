const express = require('express')
const app = express()
const port = 8000
const catalog = require('./service/services.js')
const Book = require("./models/book.model");
const db = require("./models");


app.get('/', (req, res) => {
    res.json({msg: 'this is msg'})
})

app.get('/api/v1/catalog/:page', (req,res) => {
    let offset = 0
    for (let i = 1; i < req.params.page; i++){
        offset += 8
    }
    Book(db.sequelize).findAll({
        offset: offset,
        limit: 8
    }).then(data => res.json(data))
})

app.get('/api/v1/book/:id', (req,res) => {
    Book(db.sequelize).findByPk(req.params.id)
        .then(data => {
            if (!data) res.json({
                statusCode: 404,
                error: 'Данная книга отсутствует в библиотеке'
            })
            else res.json(data)
        })
})


app.listen(port)