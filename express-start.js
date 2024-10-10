const express = require('express')
const {port, baseApi} = require('./constants/constants')
const app = express()
const {getCatalog} = require('./service/book-service')
const {getBookById, search, getUserProfile, createUser, login, patchUser} = require("./service/services");
const cors = require("cors");
const {getAllAuthors} = require("./service/author.service");
const {getAllGenres} = require("./service/genre-service");
const {getAllPublishers} = require("./service/publisher-service");
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.json({msg: 'this is main page :)'})
})

app.get(baseApi + '/authors', cors(), (req, res) => {
    getAllAuthors(req, res)
})

app.get(baseApi + '/genres', cors(), (req, res) => {
    getAllGenres(req, res)
})

app.get(baseApi + '/publishers', cors(), (req, res) => {
    getAllPublishers(req, res)
})

app.get(baseApi + '/catalog/:page', cors(), (req, res) => {
    getCatalog(req, res)
})

app.get(baseApi + '/book/:id', (req, res) => {
    getBookById(req, res)
})

app.get(baseApi + '/search', (req, res) => {
    search(req, res)
})

app.get(baseApi + '/profile/:id', (req, res) => {
    getUserProfile(req, res)
})

app.post(baseApi + '/register', (req, res) => {
    createUser(req, res)
})

app.post(baseApi + '/login', (req, res) => {
    login(req, res)
})

app.patch(baseApi + '/patch-user', (req, res) => {
    patchUser(req,res)
})

app.listen(port)