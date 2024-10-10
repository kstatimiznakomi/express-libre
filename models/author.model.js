const {DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize} = require("../constants/constants");

class Author extends Model {}

Author.init({
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
        sequelize,
        timestamps: false,
        tableName: 'author',
        modelName: 'author',
    },
);

module.exports = Author