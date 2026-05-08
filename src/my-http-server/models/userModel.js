const fs = require("fs").promises;
const path = require("path");

const USERS_FILE = path.join(__dirname, "../data/users.json");

class UserModel {
    constructor() {
        this.users = [];
        this.init();
    }

    async init() {
        await this.loadUsers();
    }

    async loadUsers() {
        try {
            const data = await fs.readFile(USERS_FILE, "utf8");
            this.users = JSON.parse(data);
        } catch (err) {
            if (err.code === "ENOENT") {
                this.users = [];
            } else {
                console.error("Ошибка загрузки users.json:", err.message);
                this.users = [];
            }
        }
    }

    async saveUsers() {
        try {
            await fs.writeFile(USERS_FILE, JSON.stringify(this.users, null, 2));
            return true;
        } catch (err) {
            console.error("Ошибка сохранения users.json:", err.message);
            return false;
        }
    }

    getAll() {
        return this.users;
    }

    async add(user) {
        const newUser = {
            id: Date.now(),
            name: user.name,
            email: user.email,
            createdAt: new Date().toISOString(),
        };
        this.users.push(newUser);
        await this.saveUsers();
        return newUser;
    }

    async delete(id) {
        const index = this.users.findIndex((u) => u.id == id);
        if (index === -1) return false;

        this.users.splice(index, 1);
        await this.saveUsers();
        return true;
    }

    findByEmail(email) {
        return this.users.find((user) => user.email === email);
    }
}

module.exports = new UserModel();
