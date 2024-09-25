const {DataTypes} = require("sequelize");
module.exports = (sequelize) => {
    const Genres = sequelize.define('genres', {
            id: {
                primaryKey: true,
                type: DataTypes.NUMBER,
                unique: true,
                autoIncrement: true
            },
            genre_name: DataTypes.STRING,
        },
        {
            timestamps: false,
            tableName: 'author',
            modelName: 'author',
        }
    );

    return Genres;
};