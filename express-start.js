const express = require('express')
const {port} = require('./constants/constants')
const app = express()
const {getBookById, getCatalog, search, getUserProfile, createUser, login} = require("./service/services");
app.use(express.json());

app.get('/', (req, res) => {
    res.json({msg: 'this is main page :)'})
})

app.get('/api/v1/catalog/:page', (req, res) => {
    getCatalog(req, res)
})

app.get('/api/v1/book/:id', (req, res) => {
    getBookById(req, res)
})

app.get('/api/v1/search', (req, res) => {
    search(req, res)
})

app.get('/api/v1/profile/:id', (req, res) => {
    getUserProfile(req, res)
})

app.post('/api/v1/register', (req, res) => {
    createUser(req, res)
})

app.post('/api/v1/login', (req, res) => {
    login(req, res)
})

app.listen(port)