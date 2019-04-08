import child from 'child_process'

export async function get(req, res) {
	try {

		// 	const { username, email, password } = req.body


		// process.on('SIGINT', function() {
		// console.log('restarting...');
		// child.fork(__filename)
		// process.exit(0)
		// })

		// console.log('Running as %d', process.pid)

		// just some code to keep the process running
		// setTimeout(function() {}, 1000000)
		debugger

		// const debugArgRegex = /--inspect(?:-brk|-port)?|--debug-port/
		// const execArgv = process.execArgv.slice()
		// if (execArgv.some(arg => !!arg.match(debugArgRegex))) {
		// 	debugger
		// 	execArgv.push('--inspect-port=9222')
		// }

		debugger
		console.log('This is pid ' + process.pid)
		process.on('exit', function() {
			debugger
			child.spawn(process.argv.shift(), process.argv, {
				cwd: process.cwd(),
				env: Object.assign({ PORT: 3001 }, process.env),
				detached: true,
				stdio: 'inherit',
				// execArgv,
			})
		})
		debugger
		process.exit(0)


		res.status(200).send({ filename: __filename })
	} catch (error) {
		res.status(400).send({ error: 'Not sure what went wrong...' })
	}
}
