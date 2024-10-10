const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../constants/constants");

class Publisher extends Model {}

Publisher.init({
        id: {
            primaryKey: true,
            type: DataTypes.NUMBER,
            unique: true,
            autoIncrement: true
        },
        publisher_name: DataTypes.STRING,
    },
    {
        sequelize,
        timestamps: false,
        tableName: 'publisher',
        modelName: 'publisher',
    }
);

module.exports = Publisher;
