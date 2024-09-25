const {DataTypes} = require("sequelize");
const Book = require('../models/book.model.js')

module.exports = (sequelize) => {
    const Author = sequelize.define('author', {
            id: {
                primaryKey: true,
                type: DataTypes.NUMBER,
                unique: true,
                autoIncrement: true
            },
            author_name: DataTypes.STRING,
            author_last_name: DataTypes.STRING,
            author_surname: DataTypes.STRING,
        },
        {
            timestamps: false,
            tableName: 'author',
            modelName: 'author',
        },
    );

    /*Author.associate = () => {
        Author.belongsToMany(Book, {
            through: 'author_books',
            as: 'book',
            foreignKey: 'authors_id'
        })
    }*/

    return Author;
};