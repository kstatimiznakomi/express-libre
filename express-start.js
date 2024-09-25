const express = require('express')
const app = express()
const port = 8000
const catalog = require('./service/services.js')
const Book = require("./models/book.model");
const Author = require("./models/author.model");
const User = require("./models/user.model");
const Genre = require("./models/genre.model");
const Publisher = require("./models/publisher.model");
const db = require("./models");


app.get('/', (req, res) => {
    res.json({msg: 'this is main page :)'})
})

app.get('/api/v1/catalog/:page', (req,res) => {
    let offset = 0
    const limit = 8
    const page = req.params.page
    let allPages = 0
    for (let i = 1; i < page; i++){
        offset += 8
    }
    Book(db.sequelize).findAll().then((data) => {
        console.log(1)
        allPages = Math.round(data.length / limit)})
    Book(db.sequelize).findAll({
        offset: offset,
        limit: limit
    }).then((data) => {
        console.log(2)
        if(page <= 0) res.redirect('http://localhost:8000/api/v1/catalog/1')
        /*else if (data.length <= 0) {

        }*/
        else res.json(data)
        /*if() return app.redirect('/api/v1/catalog/' + Book(db.sequelize).findAll().then((data) => {return data.length / limit}))*/

    })
})

app.get('/api/v1/book/:id', (req,res) => {
    Book(db.sequelize).findByPk(req.params.id)
        .then(data => {
            if (!data) res.json({
                statusCode: 404,
                error: 'Данная книга отсутствует в библиотеке'
            })
            res.json(data)
        })
})

app.get('/api/v1/search?',(req,res) => {
    console.log(Book(db.sequelize).associations)
    console.log(Author(db.sequelize).associations)
    Book(db.sequelize).findAll({
        include: [{
            model: Author(db.sequelize),
            through: { attributes: [] },
            required: true,
        }],
        where: db.sequelize.literal('`author`.`id`=2')
    })
})

app.get('/api/v1/profile/:id', (req,res) => {
    User(db.sequelize).findByPk(req.params.id, {
        attributes: ['username','name','lastname','surname']
    })
        .then((data) => {
            if (!data) res.json({
                statusCode: 404,
                error: 'Данного пользователя не существует :('
            })
            res.json(data)
        })
})

app.listen(port)