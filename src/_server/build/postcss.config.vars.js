const tinycolor = require('tinycolor2')

module.exports.plugins = [
	require('postcss-easy-import')({
		path: ['src/_client/postcss', 'router'],
		extensions: ['.css', '.scss', '.postcss'],
		prefix: '_',
	}),
	require('postcss-simple-vars'),
	require('postcss-functions')({
		functions: {
			// url: path => {
			// 	return `url('../${path.replace(/["']/g, '')}')`
			// },
			urlstatic: path => {
				return `url(${path})`
			},
			em: (fontSize, parentFontSize) => {
				parentFontSize = parentFontSize || 10
				return (Math.round(fontSize / parentFontSize * 1000) / 1000) + 'em'
			},
			fw: (targetFontSize, targetViewportWidth) => {
				targetViewportWidth = targetViewportWidth || 1000
				return (Math.round(1000 / targetViewportWidth * targetFontSize / 10 * 1000) / 1000) + 'vw'
			},
			lh: (fontSize, lineHeight) => {
				return Math.round(lineHeight / fontSize * 100) / 100
			},
			ratio: (divider, divided) => {
				return Number((divider / divided * 100).toFixed(3)) + '%'
			},
			tinycolor: (color, method, ...theArgs) => {
				return tinycolor(color)[method](...theArgs)/* .toString() */
			},
			percent: (maths, placeValue) => {
				placeValue = placeValue || 100
				return `resolve(round(${maths} * 100 * ${placeValue}) / ${placeValue})%`
			},
		},
	}),
	require('postcss-hexrgba'),
	require('postcss-custom-media'),
	require('postcss-media-minmax'),
	require('postcss-nested'),
	require('postcss-global-nested'),
	require('postcss-math'),
	// (!isLib && require('autoprefixer')),
	// require('autoprefixer')({
	// 	// browsers: ['last 2 versions', 'ie >= 9', 'Android >= 2.3', 'ios >= 7'],
	// 	browsers: [
	// 		'last 3 Chrome versions',
	// 		'last 3 Firefox versions',
	// 		'Safari >= 9',
	// 		'Edge >= 13',
	// 		'IE >= 11',
	// 		'last 3 ChromeAndroid versions',
	// 		'last 3 FirefoxAndroid versions',
	// 		'iOS >= 9',
	// 		'Android >= 4.4',
	// 	],
	// }),
	require('postcss-strip-inline-comments'),
	require('postcss-reporter'),
]
