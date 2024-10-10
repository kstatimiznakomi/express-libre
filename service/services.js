const {port} = require('../constants/constants')
const {Sequelize} = require("sequelize");
const {generateToken, verifyUser, accessDenied} = require("./jwt-service");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const UserRoles = require("../enums/enums");
const {Genre, Book, Author} = require("../models/index");
const sequelize = require("sequelize");
const Op = Sequelize.Op;

const noData = (res) => {
    return res.json({
        statusCode: 404,
        error: 'По запросу ничего не было найдено:('
    })
}

const noUserFound = (res) => {
    return res.json({
        statusCode: 404,
        error: 'Данного пользователя не существует :('
    })
}

const getBookById = async (req, res) => {
    Book.findByPk(req.params.id)
        .then((data) => {
            if (!data) noData(res)
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
        query.where.book_name = {[Op.iLike]: `%${filters.t}%`}
    }
    if (filters.d) {
        query.where.public_date = filters.d
    }
    if (filters.aid) {
        include.push({
            model: Author,
            through: 'author_books',
            attributes: [],
            as: Author.tableName,
            required: true,
        })
        query.where.authors_id = sequelize.literal(`"author->author_books"."authors_id"='${filters.aid}'`)
    }
    if (filters.gen) {
        include.push({
            model: Genre,
            through: 'genres_books',
            attributes: [],
            column: 'genres_id',
            as: Genre.tableName,
            required: true,
        })
        query.where.genres_id = sequelize.literal(`"genres->genres_books"."genres_id"='${filters.gen}'`)
    }
    if (filters.publisherId) {
        query.where.publisherId = filters.publisherId
    }
    return {query, include}
}

const search = async (req, res) => {
    let where = buildQuery(Object.assign(req.query)).query.where
    let include = buildQuery(Object.assign(req.query)).include
    Book.findAll({
        attributes: ['book_name', 'count', 'description'],
        include,
        where
    }).then((data) => {
        if (!data.length) noData(res)
        else res.json(data)
    })
}

const getUserProfile = async (req, res) => {
    User.findByPk(req.params.id, {
        attributes: ['username', 'name', 'lastname', 'surname']
    }).then((data) => {
        if (!data) noUserFound(res)
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
            const User = await User.create({
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
                //res.status(200).header('auth-token', generateToken(req, User)),
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
    try {
        if (req.headers.token) res.redirect('http://localhost:' + port + '/api/v1/catalog/1')
        else {
            User.findAll({
                where: {
                    username: req.body.username,
                }
            })
                .then((data) => {
                    if (!data.length) noUserFound(res)
                    else {
                        bcrypt.compareSync(req.body.password, data[0].dataValues.password) ? (
                                res.status(200).header('auth-token', generateToken(req, data[0].dataValues)),
                                    res.json({
                                        statusCode: 200,
                                        msg: 'Вы упешно вошли!',
                                    }))
                            :
                            res.json({
                                statusCode: 400,
                                msg: 'Неверный пароль!'
                            })
                    }
                })
        }

    } catch (er) {
        console.log(er)
    }
}

const patchUser = async (req, res) => {
    try {
        if (!req.headers.token) accessDenied(res)
        else {
            const userToken = verifyUser(req, res)
            //User.find({where: { id: userToken.id }})
            /*await User.update(userToken, { where: { id: userToken.id }, individualHooks: true })
            User.set({
                username: userToken.username,
                password: bcrypt.hashSync(userToken.password, bcrypt.genSaltSync(10)),
            })
            User.save()*/
            inProcess(res)
        }
    } catch (er) {
        console.log(er)
    }
}

module.exports = {getBookById, search, inProcess, getUserProfile, createUser, login, patchUser}
