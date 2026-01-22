const fs = require("fs");
const path = require("path");

const FILE_PATH = "/home/empr3ss/Desktop/Development/codex/src/tsk6";
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function emptyTag(content) {
    if (typeof content !== "string") return true;

    let cleaned = content.replace(/<!--[\s\S]*?-->/g, "");
    cleaned = cleaned.replace(/<[^>]*>/g, "");
    cleaned = cleaned.replace(/\s+/g, "");
    return cleaned.length === 0;
}

function isSafeFilePath(filePath, basePath) {
    const resolvedPath = path.resolve(basePath, filePath);
    const resolvedBase = path.resolve(basePath);
    return resolvedPath.startsWith(resolvedBase);
}

function parserHTM_L() {
    if (!fs.existsSync(FILE_PATH)) {
        console.error("Directory not found");
        return;
    }

    try {
        const stats = fs.statSync(FILE_PATH);
        if (!stats.isDirectory()) {
            console.error("Path is not a directory");
            return;
        }
    } catch (err) {
        console.error("Cannot access directory");
        return;
    }

    let files;
    try {
        files = fs.readdirSync(FILE_PATH);
        console.log(`Dir: ${FILE_PATH}`);
        console.log(`Files: ${files.length}`);
    } catch (err) {
        console.error("Error reading directory");
        return;
    }

    const htmlFiles = files.filter((file) => {
        if (!isSafeFilePath(file, FILE_PATH)) return false;

        const lowerFile = file.toLowerCase();
        return lowerFile.endsWith(".html") || lowerFile.endsWith(".htm");
    });

    if (htmlFiles.length === 0) {
        console.error("No HTML files found");
        return;
    }

    let totalNonEmpty = 0;
    let totalAllParagraphs = 0;

    htmlFiles.forEach((file, index) => {
        console.log(`${index + 1}. File: ${file}`);

        const filePath = path.join(FILE_PATH, file);

        if (!isSafeFilePath(filePath, FILE_PATH)) {
            console.error("Invalid file path");
            return;
        }

        let fileStats;
        try {
            fileStats = fs.statSync(filePath);
            if (fileStats.size > MAX_FILE_SIZE) {
                console.error("File too large");
                return;
            }
        } catch (err) {
            console.error("Cannot access file");
            return;
        }

        let content;
        try {
            content = fs.readFileSync(filePath, "utf8");

            if (content.includes("\x00")) {
                console.error("Binary file detected");
                return;
            }
        } catch (err) {
            console.error("Error reading file");
            return;
        }

        const paragraphRegex = /<p[^>]*>([\s\S]*?)<\/p>/gi;
        let allParagraphs = 0;
        let nonEmptyParagraphs = 0;
        let match;

        const foundContentExamples = [];

        while ((match = paragraphRegex.exec(content)) !== null) {
            allParagraphs++;
            const paragraphContent = match[1];

            if (paragraphContent && !emptyTag(paragraphContent)) {
                nonEmptyParagraphs++;

                if (foundContentExamples.length < 3) {
                    let example = paragraphContent.trim().substring(0, 50);
                    if (example.length === 50) example += "...";
                    example = example.replace(/[^\x20-\x7E]/g, "?");
                    foundContentExamples.push(example);
                }
            }
        }

        console.log(`<p>: ${allParagraphs}`);
        console.log(`nonempty: ${nonEmptyParagraphs}`);
        console.log(`empty: ${allParagraphs - nonEmptyParagraphs}`);

        if (nonEmptyParagraphs > 0 && foundContentExamples.length > 0) {
            console.log("Examples:");
            foundContentExamples.forEach((example, i) => {
                console.log(`   ${i + 1}. "${example}"`);
            });
        }

        totalNonEmpty += nonEmptyParagraphs;
        totalAllParagraphs += allParagraphs;

        console.log();
    });

    console.log("\n=== FINAL ===");
    console.log(`Total files processed: ${htmlFiles.length}`);
    console.log(`Total <p> tags: ${totalAllParagraphs}`);
    console.log(`Non-empty: ${totalNonEmpty}`);
    console.log(`Empty: ${totalAllParagraphs - totalNonEmpty}`);

    if (totalAllParagraphs > 0) {
        const percent = ((totalNonEmpty / totalAllParagraphs) * 100).toFixed(1);
        console.log(`Percent non-empty: ${percent}%`);
    }

    console.log("END");
}

parserHTM_L();
