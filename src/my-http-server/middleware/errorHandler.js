const ResponseHelper = require("../utils/response");
const config = require("../config");

module.exports = function errorHandler(err, req, res, next) {
    console.error(`[ERROR] ${err.message}`);
    console.error(err.stack);

    const statusCode = err.statusCode || config.STATUS_CODES.INTERNAL_ERROR;
    const message = err.message || "Внутренняя ошибка сервера";

    ResponseHelper.sendError(res, message, statusCode);
};
