const PageController = require("../controllers/pageController");

module.exports = [
    { method: "GET", path: "/", handler: PageController.getHome },
    { method: "GET", path: "/home", handler: PageController.getHome },
    { method: "GET", path: "/about", handler: PageController.getAbout },
    { method: "GET", path: "/contact", handler: PageController.getContact },
    { method: "GET", path: "/login", handler: PageController.getLogin },
    { method: "POST", path: "/login", handler: PageController.postLogin },
    {
        method: "GET",
        path: "/old-page",
        handler: (req, res) => {
            const ResponseHelper = require("../utils/response");
            ResponseHelper.redirect(res, "/new-page", true);
        },
    },
    {
        method: "GET",
        path: "/new-page",
        handler: (req, res) => {
            const ResponseHelper = require("../utils/response");
            ResponseHelper.sendHTML(
                res,
                '<h1>Новая страница</h1><p>Редирект с /old-page</p><a href="/">На главную</a>',
            );
        },
    },
];
