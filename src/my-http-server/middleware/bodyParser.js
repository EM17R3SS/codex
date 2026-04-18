module.exports = function bodyParser(req, res, next) {
    if (req.method !== "POST" && req.method !== "PUT") {
        req.body = {};
        return next();
    }

    let body = "";

    req.on("data", (chunk) => {
        body += chunk.toString();
    });

    req.on("end", () => {
        const contentType = req.headers["content-type"] || "";

        if (contentType.includes("application/json")) {
            try {
                req.body = JSON.parse(body);
            } catch (err) {
                req.body = {};
            }
        } else if (contentType.includes("application/x-www-form-urlencoded")) {
            req.body = {};
            const params = new URLSearchParams(body);
            for (const [key, value] of params) {
                req.body[key] = value;
            }
        } else {
            req.body = body;
        }

        next();
    });

    req.on("error", () => {
        req.body = {};
        next();
    });
};
