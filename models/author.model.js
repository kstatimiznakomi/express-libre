const {DataTypes, Sequelize, Model} = require("sequelize");
const Book = require('../models/book.model.js')
const dbConfig = require("../config/config");
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
})

class Author extends Model {
}

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