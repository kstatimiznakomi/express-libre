const Sequelize = require('sequelize');
const dbConfig = require('../config/config.js');
const Book = require("./book.model");
const Author = require("./author.model");
const db = {};

let sequelize;
sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
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


Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});


Author.belongsToMany(Book, {
    timestamps: false,
    through: 'author_books',
    as: 'book',
    foreignKey: 'authors_id',
})


Book.belongsToMany(Author, {
    timestamps: false,
    through: 'author_books',
    as: 'author',
    foreignKey: 'books_id',
})


db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {db, Book, Author};
