const express = require('express')
const app = express()
const port = 8000
const {Book} = require("./models/index");
const {Author} = require("./models/index");
const User = require("./models/user.model");
const Genre = require("./models/genre.model");
const Publisher = require("./models/publisher.model");
const db = require("./config/config");
const {where} = require("sequelize");


app.get('/', (req, res) => {
    res.json({msg: 'this is main page :)'})
})

app.get('/api/v1/catalog/:page', (req,res) => {
    let offset = 0
    const limit = 8
    const page = req.params.page
    let allPages = 0
    Book.findAll().then((data) => {
        allPages = Math.ceil(data.length / limit)
        if (page > allPages) for (let i = 1; i < allPages; i++) offset += 8
        if (page <= 0) offset = 0
        for (let i = 1; i < page; i++) offset += 8
        Book.findAll({
            offset: offset,
            limit: limit,
        }).then((data) => {
            if(page <= 0) res.redirect('http://localhost:' + port + '/api/v1/catalog/1')
            else if (page > allPages) res.redirect('http://localhost:' + port + '/api/v1/catalog/' + allPages)
            else res.json(data)
        })
    })
})

app.get('/api/v1/book/:id', (req,res) => {
    Book.findByPk(req.params.id)
        .then(data => {
            if (!data) res.json({
                statusCode: 404,
                error: 'Данная книга отсутствует в библиотеке'
            })
            else res.json(data)
        })
})

app.get('/api/v1/search?',(req,res) => {
    Book.findAll({
        include: [{
            model: Author,
            through: { attributes: [] },
            required: true,
        }, where({author_id: 2})],
    })
    res.json({msg: 'in process...'})
})

app.get('/api/v1/profile/:id', (req,res) => {
    User.findByPk(req.params.id, {
        attributes: ['username','name','lastname','surname']
    })
        .then((data) => {
            if (!data) res.json({
                statusCode: 404,
                error: 'Данного пользователя не существует :('
            })
            else res.json(data)
        })
})

app.listen(port)