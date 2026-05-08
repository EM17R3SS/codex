function parseRoutePath(path) {
    const paramNames = [];
    const regexPattern = path.replace(/:([^/]+)/g, (_, paramName) => {
        paramNames.push(paramName);
        return "([^/]+)";
    });
    const regex = new RegExp(`^${regexPattern}$`);
    return { regex, paramNames };
}

module.exports = parseRoutePath;
