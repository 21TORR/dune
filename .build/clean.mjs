import {join, dirname} from "path";
import fs from "fs-extra";
import { fileURLToPath } from 'url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
fs.removeSync(join(root, "dist"));

console.log(`Clean finished, removed the 'dist' directory.`);
console.log("");
