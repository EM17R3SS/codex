const fs = require("fs").promises;
const path = require("path");

class TemplateEngine {
    constructor(templateDir) {
        this.templateDir = templateDir;
        this.cache = {};
    }

    async loadTemplate(name) {
        if (this.cache[name]) {
            return this.cache[name];
        }

        const filePath = path.join(this.templateDir, name);

        try {
            const content = await fs.readFile(filePath, "utf8");
            this.cache[name] = content;
            return content;
        } catch (err) {
            console.error(`Ошибка загрузки шаблона ${name}:`, err.message);
            return null;
        }
    }

    async render(templateName, data = {}) {
        let template = await this.loadTemplate(templateName);

        if (template === null) {
            return "<h1>Шаблон не найден</h1>";
        }

        for (let key in data) {
            const regex = new RegExp(`{{${key}}}`, "g");
            template = template.replace(regex, data[key]);
        }
        return template;
    }
}

module.exports = TemplateEngine;
