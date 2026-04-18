const pageRoutes = require("./routes/pageRoutes");
const apiRoutes = require("./routes/apiRoutes");
const ResponseHelper = require("./utils/response");
const config = require("./config");

class Router {
    constructor() {
        this.routes = [...pageRoutes, ...apiRoutes];
    }

    findRoute(method, pathname) {
        return this.routes.find(
            (route) => route.method === method && route.path === pathname,
        );
    }

    handle(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        const route = this.findRoute(req.method, pathname);

        if (route) {
            req.query = {};
            for (const [key, value] of url.searchParams) {
                req.query[key] = value;
            }
            route.handler(req, res);
        } else {
            const html = `
                <!DOCTYPE html>
                <html>
                <head><meta charset="UTF-8"><title>404</title></head>
                <body style="text-align:center; padding:50px; background:#000; color:#fff;">
                    <h1 style="color:#ff0000; font-size:72px;">404</h1>
                    <p>Страница ${pathname} не найдена</p>
                    <a href="/" style="color:#ff0000;">Вернуться на главную</a>
                </body>
                </html>
            `;
            ResponseHelper.sendHTML(res, html, config.STATUS_CODES.NOT_FOUND);
        }
    }
}

module.exports = Router;
