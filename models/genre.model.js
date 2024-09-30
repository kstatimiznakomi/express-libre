const {DataTypes, Sequelize, Model} = require("sequelize");
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

class Genres extends Model {}

Genres.init({
        id: {
            primaryKey: true,
            type: DataTypes.NUMBER,
            unique: true,
            autoIncrement: true
        },
        genre_name: DataTypes.STRING,
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'genres',
        modelName: 'genres',
    }
);
module.exports = Genres
