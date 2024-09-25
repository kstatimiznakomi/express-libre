const {DataTypes} = require("sequelize");
//const {UserRoles} = require("/enums/enums");
module.exports = (sequelize) => {
    const User = sequelize.define('users', {
            id: {
                primaryKey: true,
                type: DataTypes.NUMBER,
                unique: true,
                autoIncrement: true
            },
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            role: DataTypes.STRING,
            status: DataTypes.STRING,
            username: DataTypes.STRING,
            name: DataTypes.STRING,
            lastname: DataTypes.STRING,
            surname: DataTypes.STRING,
            phone: DataTypes.NUMBER,
        },
        {
            timestamps: false,
            tableName: 'users',
            modelName: 'users',
        }
    );

    return User;
};