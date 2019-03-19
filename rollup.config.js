import path from 'path'
import chalk from 'chalk'
import './src/_server/build/config'

import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
// import builtins from 'rollup-plugin-node-builtins'
// import globals from 'rollup-plugin-node-globals'
import svelte from 'rollup-plugin-svelte';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import config from 'sapper/config/rollup.js';
import pkg from './package.json';

import preprocess from './src/_server/build/rollup.preprocess'
import sharedVars from './src/_server/build/rollup.vars'

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const legacy = !!process.env.SAPPER_LEGACY_BUILD;

export default {
	client: {
		input: config.client.input(),
		output: config.client.output(),
		onwarn,
		plugins: [
			replace(Object.assign({
				'process.browser': true,
				'process.server': false,
			}, sharedVars)),
			svelte({
				dev,
				extensions: ['.html', '.svelte', '.svg'],
				hydratable: true,
				emitCss: true,
				preprocess: preprocess('client'),
			}),
			// globals(),
			// builtins(),
			resolve({ browser: true }),
			commonjs(),

			legacy && babel({
				extensions: ['.js', '.mjs', '.html', '.svelte', '.svg'],
				runtimeHelpers: true,
				exclude: ['node_modules/@babel/**'],
				presets: [
					['@babel/preset-env', {
						targets: '> 0.25%, not dead',
					}],
				],
				plugins: [
					'@babel/plugin-syntax-dynamic-import',
					['@babel/plugin-transform-runtime', {
						useESModules: true,
					}],
				],
			}),

			!dev && terser({
				module: true,
			}),
		],
	},

	server: {
		input: config.server.input(),
		output: config.server.output(),
		onwarn,
		plugins: [
			replace(Object.assign({
				'process.browser': false,
				'process.server': true,
			}, sharedVars)),
			svelte({
				dev,
				extensions: ['.html', '.svelte', '.svg'],
				generate: 'ssr',
				preprocess: preprocess('server'),
			}),
			resolve(),
			commonjs(),
		],
		external: Object.keys(pkg.dependencies).concat(
			require('module').builtinModules || Object.keys(process.binding('natives'))
		),
	},

};

function onwarn(warning) {
	// Silence circular dependency warning for moment package
	if (
		warning.code === 'CIRCULAR_DEPENDENCY' &&
		!warning.importer.indexOf(path.normalize('src/node_modules/@sapper/'))
	) {
		return
	}
	console.log()
	console.log(chalk.yellow(`${warning.message} in:`))
	console.log(warning.filename.split(__dirname)[1])
	console.log(warning.frame)
	console.log()
}
