const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const Book = require("./book.model");
const Author = require("./author.model");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    port: 5432,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;


/*Author(db.sequelize).belongsToMany(Book(db.sequelize), {
    through: 'author_books',
    as: 'book',
    foreignKey: 'authors_id'
})
Book(db.sequelize).belongsToMany(Author(db.sequelize), {
    through: 'author_books',
    as: 'author',
    foreignKey: 'books_id'
})*/

module.exports = db;