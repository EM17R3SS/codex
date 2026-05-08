module.exports = function logger(req, res, next) {
    const start = Date.now();
    const originalEnd = res.end;

    console.log(`[${new Date().toISOString()}] - ${req.method} ${req.url}`);

    res.end = function (...args) {
        const duration = Date.now() - start;
        console.log(
            `[${new Date().toISOString()}] ← ${req.method} ${req.url} - ${res.statusCode} (${duration}ms)`,
        );
        originalEnd.apply(res, args);
    };

    next();
};
