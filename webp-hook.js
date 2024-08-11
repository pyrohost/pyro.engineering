import { readFileSync, writeFileSync } from "fs";

const hook = "const handler = sequence(";
const code = `(req, res, next) => {
        // if the url ends with .png, .jpg, .jpeg redirect to the same path but with .webp appended
        if (req.url.match(/\.(png|jpg|jpeg)$/)) {
                res.writeHead(301, {
                    Location: req.url + '.webp'
                });
                res.end();
            }
        next();
    },`;
const file = readFileSync("./build/handler.js").toString();
if (
	file.includes(
		"if the url ends with .png, .jpg, .jpeg redirect to the same path but with .webp appended",
	)
) {
	console.log("webp-hook.js already applied");
	process.exit(0);
}
const lines = file.split("\n");
const line = lines.findIndex((line) => line === hook);
// push string after line
lines.splice(line + 2, 0, code);
const newFile = lines.join("\n");
// write new file
writeFileSync("./build/handler.js", newFile);

const grayAnsi = "\x1b[90m";
const greenAnsi = "\x1b[32m";
const blueAnsi = "\x1b[34m";
const resetAnsi = "\x1b[0m";
console.log(
	`${grayAnsi}[${blueAnsi}webp-hook.js${grayAnsi}] ${greenAnsi}successfully applied webp hook into generated node server.`,
);
//  run ${resetAnsi}bun preview${greenAnsi} to run server.${resetAnsi}
console.log(
	`${grayAnsi}[${blueAnsi}webp-hook.js${grayAnsi}] ${greenAnsi}run ${resetAnsi}bun preview${greenAnsi} to begin the server.${resetAnsi}`,
);
