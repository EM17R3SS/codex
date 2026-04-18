const UserController = require("../controllers/userController");

module.exports = [
    { method: "GET", path: "/api/users", handler: UserController.getUsers },
    { method: "POST", path: "/api/users", handler: UserController.postUsers },
];
