const UserController = require("../controllers/userController");

module.exports = [
    { method: "GET", path: "/api/users", handler: UserController.getUsers },
    { method: "POST", path: "/api/users", handler: UserController.postUsers },
    {
        method: "GET",
        path: "/api/users/:id",
        handler: UserController.getUserById,
    },
    {
        method: "DELETE",
        path: "/api/users/:id",
        handler: UserController.deleteUser,
    },
];
