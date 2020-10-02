import glob from "glob";
import {dirname} from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const buildFiles = glob.sync("**/*.{d.ts,js}", {
	absolute: true,
	root: dirname(fileURLToPath(import.meta.url)),
	ignore: [
		"@types/**/*",
		"node_modules/**/*",
		"tests/**/*",
		"firefly.js"
	],
});

buildFiles.forEach(file => fs.unlinkSync(file));

console.log(`Clean finished, cleaned ${buildFiles.length} file(s)`);
console.log("");
