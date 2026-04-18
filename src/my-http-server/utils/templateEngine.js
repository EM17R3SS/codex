const fs = require("fs");
const path = require("path");

class TemplateEngine {
    constructor(templateDir) {
        this.templateDir = templateDir;
        this.cache = {};
    }

    loadTemplate(name) {
        if (this.cache[name]) {
            return this.cache[name];
        } //save cache
        const filePath = path.join(this.templateDir, name);

        try {
            const content = fs.readFileSync(filePath, "utf8");

            this.cache[name] = content; //if ok: template to cache

            return content;
        } catch (err) {
            console.error(`ERROR OF DOWNLOAD TEMP ${name}: `, err.message);
            return null;
        }
    }

    render(templateName, data = {}) {
        let template = this.loadTemplate(templateName);

        if (template === null) {
            return "<h1>TEMP NOT FOUND</h1>";
        }

        for (let key in data) {
            const regex = new RegExp(`{{${key}}}`, "g");
            template = template.replace(regex, data[key]);
        }
        return template;
    }
}

module.exports = TemplateEngine;
