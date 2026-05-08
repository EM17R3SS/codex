const fs = require("fs").promises;
const path = require("path");
const config = require("../config");

async function serveStatic(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;

    if (!pathname.startsWith("/css/") && !pathname.startsWith("/js/")) {
        return false;
    }

    const filePath = path.join(__dirname, "../public", pathname);
    const ext = path.extname(filePath).slice(1);
    const contentType = config.MIME_TYPES[ext] || "text/plain";

    try {
        const content = await fs.readFile(filePath);
        res.writeHead(200, { "Content-Type": contentType });
        res.end(content);
        return true;
    } catch {
        return false;
    }
}

module.exports = serveStatic;
