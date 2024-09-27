module.exports = {
    HOST: "185.139.69.174",
    USER: "postgres",
    PASSWORD: "MoDreamTheBest23",
    DB: "biblio",
    dialect: "postgres",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
};