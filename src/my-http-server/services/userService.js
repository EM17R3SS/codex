const userModel = require("../models_new");

class UserService {
    async getUsers() {
        return userModel.getAll();
    }

    async addUser(userData) {
        if (!userData.name || !userData.email) {
            throw new Error("Имя и Email обязательны");
        }

        const existing = await userModel.findByEmail(userData.email);
        if (existing) {
            const err = new Error("Пользователь с таким Email уже существует");
            err.code = "EMAIL_DUPLICATE";
            throw err;
        }

        return await userModel.add(userData);
    }

    async deleteUser(id) {
        return await userModel.delete(id);
    }

    async validateLogin(email, password) {
        const user = await userModel.findByEmail(email);
        if (user && password === "password123") {
            return { success: true, name: user.name };
        }
        return { success: false, message: "Неверный Email или Пароль" };
    }
}

module.exports = new UserService();
