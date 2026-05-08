const pageRoutes = require("./routes/pageRoutes");
const apiRoutes = require("./routes/apiRoutes");
const ResponseHelper = require("./utils/response");
const config = require("./config");
const parseRoutePath = require("./utils/routeParser");

class Router {
    constructor() {
        this.staticRoutes = [];
        this.dynamicRoutes = [];

        const allRoutes = [...pageRoutes, ...apiRoutes];

        for (const route of allRoutes) {
            if (route.path.includes(":")) {
                const { regex, paramNames } = parseRoutePath(route.path);
                this.dynamicRoutes.push({
                    ...route,
                    regex,
                    paramNames,
                });
            } else {
                this.staticRoutes.push(route);
            }
        }
    }

    findRoute(method, pathname) {
        for (const route of this.staticRoutes) {
            if (route.method === method && route.path === pathname) {
                return { route, params: {} };
            }
        }

        for (const route of this.dynamicRoutes) {
            if (route.method === method) {
                const match = route.regex.exec(pathname);
                if (match) {
                    const params = {};
                    for (let i = 0; i < route.paramNames.length; i++) {
                        params[route.paramNames[i]] = match[i + 1];
                    }
                    return { route, params };
                }
            }
        }

        return null;
    }

    handle(req, res) {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        const found = this.findRoute(req.method, pathname);

        if (found) {
            req.query = {};
            for (const [key, value] of url.searchParams) {
                req.query[key] = value;
            }
            req.params = found.params;
            found.route.handler(req, res);
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
