const {plainToClass} = require("class-transformer");

const {Book} = require("../models");
const {port} = require("../constants/constants");
const {verifyUser} = require("./jwt-service");
const {BookDTO} = require("../dto/book-dto");

const redirectToCat1 = (res) => {
    return res.redirect('http://localhost:' + port + '/api/v1/catalog/1')
}

const getCatalog = async (req, res) => {
    let offset = 0
    const limit = 8
    const page = req.params.page
    let allPages = 0
    await Book.findAll().then((data) => {
        allPages = Math.ceil(data.length / limit)
        if (page > allPages) for (let i = 1; i < allPages; i++) offset += 8
        if (page <= 0) offset = 0
        for (let i = 1; i < page; i++) offset += 8
        Book.findAll({
            offset: offset,
            limit: limit,
        }).then((data) => {
            if (page <= 0) redirectToCat1(res)
            else if (page > allPages) res.redirect('http://localhost:' + port + '/api/v1/catalog/' + allPages)
            else {
                const bookDTO = plainToClass(BookDTO, data)
                if (verifyUser(req, res)) res.json({data: data, user: verifyUser(req, res)})
                else res.json(bookDTO)
            }
        })
    })
}

module.exports = {getCatalog}