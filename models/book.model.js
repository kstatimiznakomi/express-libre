const {DataTypes} = require("sequelize");
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

    return Book;
};