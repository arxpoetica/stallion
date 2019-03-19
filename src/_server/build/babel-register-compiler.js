require('babel-core/register')({
	presets: ['env'],
	ignore: 'node_modules',
	plugins: [
		['transform-runtime', {
			polyfill: false,
			regenerator: true,
		}],
	],
})
module.exports = () => {}
