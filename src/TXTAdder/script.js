const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const readLine = require("readline");

async function TXTAdder() {
    try {
        const FilePath = [
            path.join(__dirname, "text1.txt"),
            path.join(__dirname, "text2.txt"),
            path.join(__dirname, "text3.txt"),
        ];
        const outputFile = path.join(__dirname, "output.txt");
        const writeStream = fs.createWriteStream(outputFile, {
            encoding: "utf8",
        });
        let totalLines = 0;

        for (let i = 0; i < FilePath.length; i++) {
            const filePath = FilePath[i];
            const readStream = fs.createReadStream(filePath, {
                encoding: "utf8",
            });
            const reli = readLine.createInterface({
                input: readStream,
                crlfDelay: Infinity,
            });

            let isFirstLine = true;

            for await (const line of reli) {
                if (!isFirstLine) {
                    writeStream.write("\n");
                }
                writeStream.write(line);
                isFirstLine = false;
                if (line.trim() !== "") {
                    totalLines++;
                }
            }
            if (i < FilePath.length - 1 && !isFirstLine) {
                writeStream.write("\n");
            }
        }
        writeStream.end();
        await new Promise((resolve) => writeStream.on("finish", resolve));
        // const contents = await Promise.all(
        //     FilePath.map((filePath) => fs.readFile(filePath, "utf8")),
        // );
        // const combo = contents.join("\n");
        // // const outputFile = path.join(__dirname, "output.txt");
        // const cnt = combo.trimEnd().split(/\r?\n|\r/).length;
        // const lines = combo.trimEnd().split("\n");
        // const cnt = lines.length;
        //
        // await fs.writeFile(outputFile, combo, "utf8");
        console.log(`DONE, count of strings = ${totalLines}`);
    } catch (error) {
        console.error(error);
    }
}
TXTAdder();
