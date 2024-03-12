
import {copy} from "fs-extra";

console.log("Finalizing build...");
console.log("");
console.log("");

console.log("Copying additional files");

await Promise.all(
	[
		"CHANGELOG.md",
		"README.md",
		"UPGRADE.md",
		"LICENSE",
		"package.json",
	]
		.map(
			file => copy(file, `dist/${file}`),
		)
);

console.log("done");
