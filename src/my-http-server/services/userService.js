const userModel = require("../models/userModel");

class UserService {
    async getUsers() {
        return userModel.getAll();
    }

    async addUser(userData) {
        if (!userData.name || !userData.email) {
            throw new Error("Имя и Email обязательны");
        }

        const existing = userModel.findByEmail(userData.email);
        if (existing) {
            throw new Error("Пользователь с таким Email уже существует");
        }

        return await userModel.add(userData);
    }

    async deleteUser(id) {
        return await userModel.delete(id);
    }

    validateLogin(email, password) {
        const user = userModel.findByEmail(email);
        if (user && password === "password123") {
            return { success: true, name: user.name };
        }
        return { success: false, message: "Неверный Email или Пароль" };
    }
}

module.exports = new UserService();
