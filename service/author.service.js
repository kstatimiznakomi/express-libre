const Author = require('../models/author.model')

const getAllAuthors = async (req, res) => {
    await Author.findAll().then((data) => {res.json(data)})
}

module.exports = {getAllAuthors}