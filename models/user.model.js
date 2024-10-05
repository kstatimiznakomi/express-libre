const {DataTypes, Model, Sequelize} = require("sequelize");
const dbConfig = require("../config/config.json");
const {hash} = require("bcrypt");
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
const bcrypt = require('bcrypt');

class User extends Model{}

User.init({
        id: {
            primaryKey: true,
            type: DataTypes.NUMBER,
            unique: true,
            autoIncrement: true
        },
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        role: DataTypes.STRING,
        username: DataTypes.STRING,
        name: DataTypes.STRING,
        lastname: DataTypes.STRING,
        surname: DataTypes.STRING,
        phone: DataTypes.NUMBER,
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'users',
        modelName: 'users',
    }
);

module.exports = User;