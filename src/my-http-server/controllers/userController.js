const path = require("path");
const ResponseHelper = require("../utils/response");
const userService = require("../services/userService");
const TemplateEngine = require("../utils/templateEngine");

const templateEngine = new TemplateEngine(
    path.join(__dirname, "../templates/users"),
);

class UserController {
    static getUsers(req, res) {
        const users = userService.getUsers();

        const url = new URL(req.url, `http://${req.headers.host}`);
        const format = url.searchParams.get("format");

        if (format === "json") {
            ResponseHelper.sendJSON(res, { users, count: users.length });
        } else {
            const html = templateEngine.render("userList.html", {
                users: JSON.stringify(users),
                userCount: users.length,
            });
            ResponseHelper.sendHTML(res, html);
        }
    }

    static postUsers(req, res) {
        try {
            const newUser = userService.addUser(req.body);
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
            ResponseHelper.sendJSON(
                res,
                {
                    success: false,
                    error: error.message,
                },
                400,
            );
        }
    }
}

module.exports = UserController;
