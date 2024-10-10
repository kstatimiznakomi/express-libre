const Sequelize = require('sequelize');
const Book = require("./book.model");
const Author = require("./author.model");
const Genre = require("./genre.model");
const {sequelize} = require("../constants/constants");
const db = {};


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

Book.belongsToMany(Genre, {
    timestamps: false,
    through: 'genres_books',
    as: 'genres',
    foreignKey: 'books_id',
})

Genre.belongsToMany(Book, {
    timestamps: false,
    through: 'genres_books',
    as: 'genres',
    foreignKey: 'genres_id',
})

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = {db, Book, Author, Genre};
