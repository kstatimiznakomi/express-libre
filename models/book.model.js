const {DataTypes} = require("sequelize");
const Author = require("./author.model");
module.exports = (sequelize) => {
    const Book = sequelize.define('book', {
        id: {
            primaryKey: true,
            type: DataTypes.NUMBER,
            unique: true,
            autoIncrement: true
        },
        book_name: DataTypes.STRING,
        description: DataTypes.STRING,
        count: {
            type: DataTypes.NUMBER
        },
        isbn: {
            type: DataTypes.STRING
        },
        img: {
            type: DataTypes.STRING
        },
        public_date: {
            type: DataTypes.NUMBER
        },
    },
        {
            timestamps: false,
            tableName: 'book',
            modelName: 'book',
        }
    );

    /*Book.associate = () => {
        Book.belongsToMany(Author, {
            through: 'author_books',
            as: 'author',
            foreignKey: 'books_id'
        })
    }*/
    return Book;
};