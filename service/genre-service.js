const Genre = require('../models/genre.model')

const getAllGenres = async (req, res) => {
    await Genre.findAll().then((data) => {res.json(data)})
}

module.exports = {getAllGenres}