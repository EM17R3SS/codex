const fs = require("fs").promises;
const path = require("path");

async function TXTAdder() {
    try {
        const FilePath = [
            path.join(__dirname, "text1.txt"),
            path.join(__dirname, "text2.txt"),
            path.join(__dirname, "text3.txt"),
        ];
        const contents = await Promise.all(
            FilePath.map((filePath) => fs.readFile(filePath, "utf8")),
        );
        const combo = contents.join("\n");
        const outputFile = path.join(__dirname, "output.txt");
        const cnt = combo.split("\n").length;

        await fs.writeFile(outputFile, combo, "utf8");

        console.log(`DONE, count of strings = ${cnt}`);
    } catch (error) {
        console.error(error);
    }
}
TXTAdder();
