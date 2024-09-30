const {DataTypes, Sequelize, Model, InferAttributes, InferCreationAttributes} = require("sequelize");
const Author = require("./author.model");
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

class Book extends Model {
}

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
