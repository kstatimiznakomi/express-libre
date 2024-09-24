const express = require('express')
const app = express()
const port = 8000
const catalog = require('./service/services.js')
const Book = require("./models/book.model");
const db = require("./models");


app.get('/', (req, res) => {
    res.json({msg: 'this is msg'})
})

app.get('/catalog/:page', (req,res) => {
    let offset = 0
    for (let i = 1; i < req.params.page; i++){
        offset += 8
    }
    Book(db.sequelize).findAll({
        offset: offset,
        limit: 8
    })
        .then(data => res.json(data))
    //res.json(catalog.getCatalog(req,res))
})

app.use(express.json())

app.listen(port)