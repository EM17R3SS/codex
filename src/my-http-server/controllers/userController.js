const path = require("path");
const ResponseHelper = require("../utils/response");
const userService = require("../services/userService");
const TemplateEngine = require("../utils/templateEngine");

const templateEngine = new TemplateEngine(
    path.join(__dirname, "../templates/users"),
);

class UserController {
    static async getUsers(req, res) {
        const users = await userService.getUsers();

        const url = new URL(req.url, `http://${req.headers.host}`);
        const format = url.searchParams.get("format");

        if (format === "json") {
            ResponseHelper.sendJSON(res, { users, count: users.length });
        } else {
            const html = await templateEngine.render("userList.html", {
                users: JSON.stringify(users),
                userCount: users.length,
            });
            ResponseHelper.sendHTML(res, html);
        }
    }

    static async getUserById(req, res) {
        const { id } = req.params;
        const users = await userService.getUsers();
        const user = users.find((u) => u.id == id);

        if (!user) {
            ResponseHelper.sendJSON(
                res,
                { error: "Пользователь не найден" },
                404,
            );
            return;
        }

        ResponseHelper.sendJSON(res, { user });
    }

    static async postUsers(req, res) {
        try {
            const newUser = await userService.addUser(req.body);
            ResponseHelper.sendJSON(
                res,
                {
                    success: true,
                    user: newUser,
                    message: "Пользователь успешно добавлен",
                },
                201,
            );
        } catch (error) {
            let message = "Ошибка при создании пользователя";

            if (error.code === "EMAIL_DUPLICATE") {
                message = "Пользователь с таким Email уже существует";
            } else if (error.name === "SequelizeUniqueConstraintError") {
                message = "Пользователь с таким Email уже существует";
            } else if (error.code === 11000) {
                message = "Пользователь с таким Email уже существует";
            } else if (error.message) {
                message = error.message;
            }

            ResponseHelper.sendJSON(
                res,
                {
                    success: false,
                    error: message,
                },
                400,
            );
        }
    }

    static async deleteUser(req, res) {
        const { id } = req.params;
        const deleted = await userService.deleteUser(id);

        if (!deleted) {
            ResponseHelper.sendJSON(
                res,
                { error: "Пользователь не найден" },
                404,
            );
            return;
        }

        ResponseHelper.sendJSON(res, {
            success: true,
            message: "Пользователь удалён",
        });
    }
}

module.exports = UserController;
