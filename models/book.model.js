const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../constants/constants");

class Book extends Model {}

Book.init({
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
        sequelize,
        timestamps: false,
        tableName: 'book',
        modelName: 'book',
    }
);

module.exports = Book
