const Publisher = require('../models/publisher.model')

const getAllPublishers = async (req, res) => {
    await Publisher.findAll().then((data) => {res.json(data)})
}

module.exports = {getAllPublishers}