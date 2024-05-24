import {copy} from "fs-extra";

console.log("Finalizing build...");
console.log("");
console.log("");

console.log("Copying additional files");


await Promise.all(
	[
		copy("src/build-config/webpack.cjs", `dist/build-config/webpack.cjs`),
	],
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
