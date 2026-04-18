const config = require("../config");

class ResponseHelper {
    static sendJSON(res, data, statusCode = config.STATUS_CODES.OK) {
        res.writeHead(statusCode, { "Content-Type": config.MIME_TYPES.json });
        res.end(JSON.stringify(data));
    } //send data is status ok

    static sendHTML(res, html, statusCode = config.STATUS_CODES.OK) {
        res.writeHead(statusCode, { "Content-Type": config.MIME_TYPES.html });
        res.end(html);
    } //send html if status ok

    static redirect(res, location, permanent = false) {
        let statusCode;
        if (permanent === false) {
            statusCode = 302;
        } else {
            statusCode = 301;
        }
        res.writeHead(statusCode, {
            Location: location,
        });
        res.end();
    } //redirect to 301 const and 302 time

    static sendError(
        res,
        message,
        statusCode = config.STATUS_CODES.INTERNAL_ERROR,
    ) {
        const html = `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <title>Ошибка ${statusCode}</title>
                    <style>
                        body { font-family: Arial, sans-serif; text-align: center; padding: 50px; background: #000; color: #fff; }
                        h1 { font-size: 72px; color: #ff0000; }
                        a { color: #ff0000; text-decoration: none; }
                    </style>
                </head>
                <body>
                    <h1>${statusCode}</h1>
                    <p>${message}</p>
                    <a href="/">Вернуться на главную</a>
                </body>
                </html>
            `;

        this.sendHTML(res, html, statusCode);
    }
}

module.exports = ResponseHelper;
