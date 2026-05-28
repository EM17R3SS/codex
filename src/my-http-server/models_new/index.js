const dbConfig = require("../config/database");

let User;

if (dbConfig.orm === "mongoose") {
    const { connectDB, getMongoose } = require("../db/mongoose");
    const UserModel = require("./UserMongoose");

    let UserInstance = null;

    async function init() {
        await connectDB();
        UserInstance = UserModel;
        console.log("Коллекция users готова (MongoDB)");
    }

    const userDB = {
        init,

        getAll: async () => {
            return await UserInstance.find();
        },

        add: async (user) => {
            const newUser = new UserInstance({
                name: user.name,
                email: user.email,
                createdAt: new Date(),
            });
            const saved = await newUser.save();
            return {
                id: saved._id,
                name: saved.name,
                email: saved.email,
                createdAt: saved.createdAt,
            };
        },

        delete: async (id) => {
            const result = await UserInstance.findByIdAndDelete(id);
            return result !== null;
        },

        findByEmail: async (email) => {
            const user = await UserInstance.findOne({ email });
            return user ? user.toObject() : null;
        },
    };

    module.exports = userDB;
} else if (dbConfig.orm === "sequelize") {
    const { connectDB, getSequelize } = require("../db/sequelize");
    const UserModel = require("./UserSequelize");

    let UserInstance = null;

    async function init() {
        await connectDB();
        UserInstance = UserModel();
        await getSequelize().sync();
        console.log("Таблица users синхронизирована (SQLite)");
    }

    const userDB = {
        init,

        getAll: async () => {
            const users = await UserInstance.findAll();
            return users.map((u) => u.toJSON());
        },

        add: async (user) => {
            const newUser = await UserInstance.create({
                name: user.name,
                email: user.email,
                createdAt: new Date(),
            });
            return {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                createdAt: newUser.createdAt,
            };
        },

        delete: async (id) => {
            const deleted = await UserInstance.destroy({ where: { id } });
            return deleted > 0;
        },

        findByEmail: async (email) => {
            const user = await UserInstance.findOne({ where: { email } });
            return user ? user.toJSON() : null;
        },
    };

    module.exports = userDB;
} else {
    module.exports = require("../models/userModel");
}
