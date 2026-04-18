module.exports = {
    PORT: 6661, //xexexexexe
    HOST: "localhost", //base

    MIME_TYPES: {
        //readed and edit to this
        html: "text/html; charset=utf8",
        css: "text/css",
        js: "application/javascript",
        json: "application/json; charset=utf8",
    },

    STATUS_CODES: {
        //base
        OK: 200,
        CREATED: 201,
        MOVED_PERMANENTLY: 301, //redirect
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        INTERNAL_ERROR: 500,
    },
};
