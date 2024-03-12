import typescript from '@rollup/plugin-typescript';
import {globSync} from "glob";
import path from "node:path";
import {fileURLToPath} from "node:url";
import cleanup from 'rollup-plugin-cleanup';
import copy from 'rollup-plugin-copy';
import babel from "@rollup/plugin-babel";
import preserveDirectives from "rollup-plugin-preserve-directives";

export default {
	input: Object.fromEntries(
		globSync('src/**/*.{ts,tsx}').map(file => [
			// This remove `src/` as well as the file extension from each
			// file, so e.g. src/nested/foo.js becomes nested/foo
			path.relative(
				'src',
				file.slice(0, file.length - path.extname(file).length)
			),
			// This expands the relative paths to absolute paths, so e.g.
			// src/nested/foo becomes /project/src/nested/foo.js
			fileURLToPath(new URL(file, import.meta.url))
		])
	),
	output: {
		dir: 'dist',
		format: 'esm',
		entryFileNames: '[name].mjs',
		preserveModules: true,
	},
	plugins: [
		typescript(),
		babel({
			babelHelpers: 'bundled',
			presets: ['@babel/preset-react'],
			extensions: ['.js', '.jsx', '.ts', '.tsx']
		}),
		preserveDirectives(),
		cleanup({
			maxEmptyLines: 2,
		}),
		copy({
			targets: [
				{
					src: "{CHANGELOG,README,UPGRADE}.md",
					dest: "dist",
				},
				{
					src: "LICENSE",
					dest: "dist",
				},
				{
					src: "package.json",
					dest: "dist",
				},
			],
		}),
	],
	external: [
		"react",
		"react-dom",
		"xtend",
		"next",
		"next/navigation",
	],
};
