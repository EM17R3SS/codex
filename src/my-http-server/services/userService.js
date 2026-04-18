const userModel = require("../models/userModel");

class UserService {
    getUsers() {
        return userModel.getAll();
    }

    addUser(userData) {
        if (!userData.name || !userData.email) {
            throw new Error("Имя и Email Обязательны");
        }

        const existing = userModel.findByEmail(userData.email);
        if (existing) {
            throw new Error("Пользователь с Таким Email Уже Существует");
        }

        return userModel.add(userData);
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
