const fs = require("fs");
const path = require("path");
const { Transform, pipeline } = require("stream");
const { promisify } = require("util");
const pipelineAsync = promisify(pipeline);

class CSVTransform extends Transform {
    constructor() {
        super(); //parent constructor
        this.firstLine = true; //header
        this.buffer = "";
        this.header = null;
        this.nameIndex = null;
    }

    _transform(chunk, encoding, callback) {
        this.buffer += chunk.toString();

        const lines = this.buffer.split("\n");

        this.buffer = lines.pop();
        for (const line of lines) {
            this.processLine(line);
        }

        callback();
    }
    processLine(line) {
        if (!line.trim()) return;

        if (this.firstLine) {
            this.header = line;
            const headers = this.header.split(",");
            this.nameIndex = headers.findIndex(
                (h) => h.trim().toLowerCase() === "name",
            );
            this.push(line + "\n");
            this.firstLine = false;
            return;
        }

        const transformed = this.transformLine(line);
        this.push(transformed + "\n");
    }

    transformLine(line) {
        const fields = line.split(",");

        if (this.nameIndex === -1) {
            return line;
        }
        if (fields.length <= this.nameIndex) {
            return line;
        }
        if (fields[this.nameIndex]) {
            fields[this.nameIndex] = fields[this.nameIndex].toUpperCase();
        }

        //if (fields.length < 2) return line; //check for 2 fields (ex: id, name), else return

        // const headers = this.header.split(","); //to name fields
        // const nameIndex = headers.findIndex(
        //     //find by index name
        //     (h) => h.trim().toLowerCase() === "name", //only for Name name NAME etc
        // );

        // if (nameIndex !== -1 && fields[nameIndex]) {
        //     fields[nameIndex] = fields[nameIndex].toUpperCase();
        // }

        return fields.join(",");
    }
    _flush(callback) {
        if (this.buffer.trim()) {
            this.processLine(this.buffer);
        }
        callback();
    }
}

async function processCSV() {
    try {
        const readStream = fs.createReadStream("input.csv", "utf8");
        const writeStream = fs.createWriteStream("output.csv");
        const transformer = new CSVTransform();

        await pipelineAsync(readStream, transformer, writeStream);

        console.log("DONE");
    } catch (err) {
        console.error("ERROR:", err.message);
    }
}

processCSV();
