const {Book} = require('../models/index')
const {json} = require("express");
const {port} = require('../constants/constants')
const {Sequelize} = require("sequelize");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const UserRoles = require("../enums/enums");
const {Author} = require("../models/index");
const sequelize = require("sequelize");
const Op = Sequelize.Op;

const getCatalog = async (req, res) => {
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
}

const getBookById = async (req, res) => {
    Book.findByPk(req.params.id)
        .then((data) => {
            if (!data) return res.json({
                statusCode: 404,
                error: 'Данная книга отсутствует в библиотеке'
            })
            else {
                return res.json(Object.assign(data).dataValues)
            }
        })
}

const buildQuery = (filters) => {
    const include = []
    const query = {
        where: {}
    }
    if (filters.t) {
        query.where.book_name = {[Op.iLike]:`%${filters.t}%`}
    }
    if (filters.pd) {
        query.where.public_date = filters.pd
    }
    if (filters.aid) {
        include.push({
            model: Author,
            through: 'author_books',
            as: Author.tableName,
            required: true,
        })
        query.where.authors_id =
            sequelize.literal(`"author->author_books"."authors_id"='${filters.aid}'`)
    }
    if (filters.genreId) {
        query.where.genreId = filters.genreId
    }
    if (filters.publisherId) {
        query.where.publisherId = filters.publisherId
    }
    return {query, include}
}

const search = async (req, res) => {
    let where = buildQuery(Object.assign(req.query)).query.where
    let include = buildQuery(Object.assign(req.query)).include
    console.log(where)
    Book.findAll({
        attributes: ['book_name','count', 'description'],
        include,
        where
    }).then(data => {
        res.json(data)
    })
}

const getUserProfile = async (req, res) => {
    User.findByPk(req.params.id, {
        attributes: ['username', 'name', 'lastname', 'surname']
    }).then((data) => {
        if (!data) res.json({
            statusCode: 404,
            error: 'Данного пользователя не существует :('
        })
        else res.json(data)
    })
}

const inProcess = async (res) => {
    return res.json({msg: 'in process...'})
}

const createUser = async (req, res) => {
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
                    msg: 'Вы успешно зарегистрированы!'
                })
            })
        } else {
            res.json({
                msg: 'Такой пользователь уже существует!'
            })
        }
    } catch (er) {
        console.log(er)
    }
}

const login = async (req, res) => {
    User.findAll({
        where: {
            username: req.body.username,
        }
    })
        .then((data) => {
            if (!data.length) {
                res.json({
                    statusCode: 404,
                    msg: "Данного пользователя не существует!"
                })
            } else {
                console.log(req.body.password, data[0].dataValues.password)
                bcrypt.compareSync(req.body.password, data[0].dataValues.password) ?
                    res.json({
                        statusCode: 200,
                        msg: 'Вы упешно вошли!'
                    })
                    :
                    res.json({
                        statusCode: 400,
                        msg: 'Неверный пароль!'
                    })
            }
        })
}

module.exports = {getBookById, getCatalog, search, inProcess, getUserProfile, createUser, login}
