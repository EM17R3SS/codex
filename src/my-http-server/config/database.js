require("dotenv").config();

module.exports = {
    orm: process.env.DB_ORM || "sequelize",

    sqlite: {
        storage: process.env.SQLITE_STORAGE || "./data/database.sqlite",
        dialect: "sqlite",
    },

    postgres: {
        host: process.env.PG_HOST || "localhost",
        port: process.env.PG_PORT || 5432,
        user: process.env.PG_USER || "postgres",
        password: process.env.PG_PASSWORD || "",
        database: process.env.PG_DATABASE || "myapp",
        dialect: "postgres",
    },

    mongodb: {
        uri: process.env.MONGO_URI || "mongodb://localhost:27017/myapp",
    },
};
