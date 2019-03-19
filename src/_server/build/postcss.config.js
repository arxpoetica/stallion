const plugins = require('./postcss.config.vars').plugins

// const name = process.env.BUNDLE
// const isLib = !!name.match(/Lib$/)

module.exports = (ctx) => ({
	syntax: require('postcss-scss'),
	map: ctx.options.map,
	plugins,
})
