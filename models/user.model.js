const {DataTypes, Model} = require("sequelize");
const {sequelize} = require("../constants/constants");

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