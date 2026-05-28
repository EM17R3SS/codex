const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const config = require("./config");
const Router = require("./router");
const logger = require("./middleware/logger");
const bodyParser = require("./middleware/bodyParser");
const errorHandler = require("./middleware/errorHandler");
const ResponseHelper = require("./utils/response");
const serveStatic = require("./utils/static");
const dotenv = require("dotenv");
const dbConfig = require("./config/database");

dotenv.config();

class Server {
    constructor() {
        this.router = new Router();
        this.server = http.createServer(this.requestHandler.bind(this));
    }

    async requestHandler(req, res) {
        if (await serveStatic(req, res)) {
            return;
        }

        logger(req, res, () => {
            bodyParser(req, res, () => {
                try {
                    this.router.handle(req, res);
                } catch (err) {
                    errorHandler(err, req, res, () => {});
                }
            });
        });
    }

    async start() {
        //db connect
        if (dbConfig.orm === "mongoose") {
            const { connectDB } = require("./db/mongoose");
            await connectDB();
        } else {
            const { connectDB } = require("./db/sequelize");
            await connectDB();
        }

        //model init
        const userModel = require("./models_new");
        await userModel.init();

        //start
        this.server.listen(config.PORT, config.HOST, () => {
            console.log(`http://${config.HOST}:${config.PORT}`);
            console.log("\nAvailable routes:\n");
            console.log("Pages:");
            console.log("     GET  /            - Home page");
            console.log("     GET  /about       - About page");
            console.log("     GET  /contact     - Contact page");
            console.log("     GET  /login       - Login form");
            console.log("     POST /login       - Process login");
            console.log("\nAPI:");
            console.log("     GET  /api/users   - User list");
            console.log("     POST /api/users   - Add user");
            console.log("\nRedirect:");
            console.log("     GET  /old-page    - 301 → /new-page");
            console.log("\nStatic:");
            console.log("     /css/style.css    - Cyberpunk styles");
            console.log("     /js/main.js       - Client JS");
            console.log("\nReady for requests\n");
        });
    }
}

const server = new Server();
server.start();
