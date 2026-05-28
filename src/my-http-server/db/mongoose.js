const mongoose = require("mongoose");
const dbConfig = require("../config/database");

async function connectDB() {
    try {
        await mongoose.connect(dbConfig.mongodb.uri);
        console.log("MongoDB подключена (Mongoose)");
    } catch (err) {
        console.error("Ошибка подключения MongoDB:", err.message);
        process.exit(1);
    }
}

function getMongoose() {
    return mongoose;
}

module.exports = { connectDB, getMongoose };
