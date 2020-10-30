import glob from "glob";
import {dirname, relative} from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));

const buildFiles = glob.sync("**/*.{d.ts,js}", {
	absolute: true,
	root,
	ignore: [
		"@types/**/*",
		"node_modules/**/*",
		"tests/**/*",
		"firefly.js"
	],
});

const cleaned = buildFiles.map(file => {
	fs.unlinkSync(file);
	return relative(root, file);
});

console.log(`Clean finished, cleaned ${buildFiles.length} file(s):`);
console.log();
cleaned.forEach(file => console.log(`• ${file}`));
console.log("");
