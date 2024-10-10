const {DataTypes, Sequelize, Model} = require("sequelize");
const {sequelize} = require("../constants/constants");

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
