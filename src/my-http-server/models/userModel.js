const fs = require("fs");
const path = require("path");

const USERS_FILE = path.join(__dirname, "../data/users.json");

class UserModel {
    constructor() {
        this.users = [];
        this.loadUsers();
    }

    loadUsers() {
        try {
            if (fs.existsSync(USERS_FILE)) {
                const data = fs.readFileSync(USERS_FILE, "utf8");
                this.users = JSON.parse(data);
            }
        } catch (err) {
            this.users = [];
        }
    }

    saveUsers() {
        try {
            fs.writeFileSync(USERS_FILE, JSON.stringify(this.users, null, 2));
            return true;
        } catch (err) {
            return false;
        }
    }

    getAll() {
        return this.users;
    }

    add(user) {
        const newUser = {
            id: Date.now(),
            name: user.name,
            email: user.email,
            createdAt: new Date().toISOString(),
        };
        this.users.push(newUser);
        this.saveUsers();
        return newUser;
    }

    findByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
}

module.exports = new UserModel();
