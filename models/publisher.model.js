const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    const Publisher = sequelize.define('publisher', {
            id: {
                primaryKey: true,
                type: DataTypes.NUMBER,
                unique: true,
                autoIncrement: true
            },
            publisher_name: DataTypes.STRING,
        },
        {
            timestamps: false,
            tableName: 'author',
            modelName: 'author',
        }
    );

    return Publisher;
};