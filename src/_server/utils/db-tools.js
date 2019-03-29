import { yellow, magenta } from 'ansi-colors'

const start = yellow('----- >>>')
const stop = yellow('----- ^^^')

export const log = (logs, grouping) => {
	logs = Array.isArray(logs) ? logs : [logs]
	grouping = grouping || 'migration log'
	console.log()
	console.log(`${start} ${magenta(grouping)}`)
	logs.forEach(log => console.dir(log, { depth: null, colors: true }))
	console.log(stop)
}

// const Papa = require('papaparse')
// module.exports.papaParseAsync = function(file, options) {
// 	options = options || {}
// 	return new Promise(function(complete, error) {
// 		options.complete = complete
// 		options.error = error
// 		Papa.parse(file, options)
// 	})
// }
