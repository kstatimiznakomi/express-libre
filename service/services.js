const Book = require('../models/book.model.js')
const {json} = require("express");
const db = require("../models");

module.exports = {
    getCatalog: function (req,res) {
        try{
            const db = require("../models/index.js");
            Book(db.sequelize).findAll({
                limit: 8
            })
                .then(data => res.json(data))
        }
        catch (er){
            console.log(er)
        }
    }
}



