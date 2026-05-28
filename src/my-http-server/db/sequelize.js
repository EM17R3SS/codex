const { Sequelize, DataTypes } = require("sequelize");
const dbConfig = require("../config/database");

let sequelize;

function connectDB() {
    sequelize = new Sequelize({
        dialect: dbConfig.sqlite.dialect,
        storage: dbConfig.sqlite.storage,
        logging: false,
    });

    return sequelize
        .authenticate()
        .then(() => console.log("SQLite подключена"))
        .catch((err) => console.error("Ошибка подключения:", err));
}

function getSequelize() {
    return sequelize;
}

function getDataTypes() {
    return DataTypes;
}

module.exports = { connectDB, getSequelize, getDataTypes };
