const path = require("path");
const TemplateEngine = require("../utils/templateEngine");
const ResponseHelper = require("../utils/response");

const templateEngine = new TemplateEngine(
    path.join(__dirname, "../templates/pages"),
);

class PageController {
    static async getHome(req, res) {
        const html = await templateEngine.render("home.html", {
            title: "Главная страница",
            content: "Добро пожаловать на наш сайт",
        });
        ResponseHelper.sendHTML(res, html);
    }

    static async getAbout(req, res) {
        const html = await templateEngine.render("about.html", {
            title: "О нас",
            companyName: "",
            experience: "",
            projects: "",
        });
        ResponseHelper.sendHTML(res, html);
    }

    static async getContact(req, res) {
        const html = await templateEngine.render("contact.html", {
            title: "Контакты",
            email: "info@example.com",
            phone: "+7",
        });
        ResponseHelper.sendHTML(res, html);
    }

    static async getLogin(req, res) {
        const html = await templateEngine.render("login.html", {
            title: "Вход в систему",
        });
        ResponseHelper.sendHTML(res, html);
    }

    static postLogin(req, res) {
        const { email, password } = req.body;
        const userService = require("../services/userService");

        const result = userService.validateLogin(email, password);

        if (result.success) {
            const html = `
                <!DOCTYPE html>
                <html>
                <head><meta charset="UTF-8"><title>Приветствие</title></head>
                <body style="text-align:center; padding:50px; background:#000; color:#fff;">
                    <h1 style="color:#ff0000;">Добро пожаловать, ${result.name}!</h1>
                    <p>Вы успешно вошли в систему.</p>
                    <a href="/" style="color:#ff0000;">На главную</a>
                </body>
                </html>
            `;
            ResponseHelper.sendHTML(res, html);
        } else {
            const html = `
                <!DOCTYPE html>
                <html>
                <head><meta charset="UTF-8"><title>Ошибка входа</title></head>
                <body style="text-align:center; padding:50px; background:#000; color:#fff;">
                    <h1 style="color:#ff0000;">Ошибка</h1>
                    <p>${result.message}</p>
                    <a href="/login" style="color:#ff0000;">Попробовать снова</a>
                </body>
                </html>
            `;
            ResponseHelper.sendHTML(res, html, 400);
        }
    }
}

module.exports = PageController;
