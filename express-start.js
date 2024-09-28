const express = require('express')
const app = express()
const port = 8000
const {Sequelize} = require("sequelize");
const {comparePassword} = require("./service/services");
const Op = Sequelize.Op;
const {Book} = require("./models/index");
const {Author} = require("./models/index");
const User = require("./models/user.model");
const Genre = require("./models/genre.model");
const Publisher = require("./models/publisher.model");
const db = require("./config/config");
const {where} = require("sequelize");
app.use(express.json());
const bcrypt = require('bcrypt');
const UserRoles = require('./enums/enums');
const {json} = require("express");


app.get('/', (req, res) => {
    res.json({msg: 'this is main page :)'})
})

app.get('/api/v1/catalog/:page', (req, res) => {
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
            if (page <= 0) res.redirect('http://localhost:' + port + '/api/v1/catalog/1')
            else if (page > allPages) res.redirect('http://localhost:' + port + '/api/v1/catalog/' + allPages)
            else res.json(data)
        })
    })
})

app.get('/api/v1/book/:id', (req, res) => {
    Book.findByPk(req.params.id)
        .then(data => {
            if (!data) res.json({
                statusCode: 404,
                error: 'Данная книга отсутствует в библиотеке'
            })
            else res.json(data)
        })
})

app.get('/api/v1/search', (req, res) => {
    for (let item in req.query) console.log(item)
    Book.findAll({
        where: {
            book_name: {[Op.iLike]: `%${req.query.searchText}%`}
        }
    }).then(data => {
        res.json(data)
    })
    //res.json({msg: 'in process...'})
})

app.get('/api/v1/profile/:id', (req, res) => {
    User.findByPk(req.params.id, {
        attributes: ['username', 'name', 'lastname', 'surname']
    }).then((data) => {
        if (!data) res.json({
            statusCode: 404,
            error: 'Данного пользователя не существует :('
        })
        else res.json(data)
    })
})

app.post('/api/v1/create-user', (req, res) => {
    try {
        const foundUser = User.findAll({
            where: {
                email: req.body.email,
                phone: req.body.phone,
            }
        })
        if (!foundUser) {
            User.create({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10)),
                name: req.body.name,
                username: req.body.username,
                lastname: req.body.lastname,
                surname: req.body.surname,
                active: req.body.active,
                phone: req.body.phone,
                role: UserRoles.reader,
            }).then(() => {
                res.json({
                    statusCode: 200,
                    msg: 'User successfully registered!'
                })
            })
        } else {
            res.json({
                msg: 'This user is already exist!'
            })
        }
    } catch (er) {
        console.log(er)
    }
})

app.post('/api/v1/login', (req, res) => {
    User.findAll({
        where: {
            username: req.body.username,
        }
    })
        .then((data) => {
            if (!data.length) {
                res.json({
                    statusCode: 404,
                    msg: "This user doesn't exist!"
                })
            } else {
                console.log(req.body.password, data[0].dataValues.password)
                bcrypt.compareSync(req.body.password, data[0].dataValues.password) ?
                    res.json({
                        statusCode: 200,
                        msg: 'You successfully logged in!'
                    })
                    :
                    res.json({
                        statusCode: 400,
                        msg: 'Wrong password!'
                    })
            }
        })
})

app.listen(port)