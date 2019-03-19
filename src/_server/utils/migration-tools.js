require('colors')
const Papa = require('papaparse')

const start = '----- >>>'.yellow
const stop = '----- ^^^'.yellow

module.exports.log = (logs, grouping) => {
	logs = Array.isArray(logs) ? logs : [logs]
	grouping = grouping || 'migration log'
	console.log()
	console.log(`${start} ${grouping.magenta}`)
	logs.forEach(log => console.dir(log, { depth: null, colors: true }))
	console.log(stop)
}

module.exports.papaParseAsync = function(file, options) {
	options = options || {}
	return new Promise(function(complete, error) {
		options.complete = complete
		options.error = error
		Papa.parse(file, options)
	})
}
