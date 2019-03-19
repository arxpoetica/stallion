// excellent article on all this: https://medium.freecodecamp.org/node-js-child-processes-everything-you-need-to-know-e69498fe970a

import fs from 'fs'
import globby from 'globby'
import config from '../build/config'

// console.log(config)
const env = config.NODE_ENV || 'development'
const script = config.npm_lifecycle_event

const { spawn } = require('child_process')

let command
const compiler = '--compiler="js:./src/_server/build/babel-register-compiler.js"'
const dirs = '--migrations-dir=src/_server/data/migrations'
const filename = `src/_server/data/.migrate-${env}`
const shared = `${dirs} -f ${filename} ${compiler}`

if (script === 'm:up') {
	command = `migrate up ${shared} ${getMigration('up')}`
} else if (script === 'm:down') {
	command = `migrate down ${shared} ${getMigration('down')}`
} else if (script === 'm:up:all') {
	command = `migrate up ${shared}`
} else if (script === 'm:down:all') {
	command = `migrate down ${shared}`
} else if (script === 'm:create') {
	const args = JSON.parse(config.npm_config_argv).original
	command = `migrate create ${args[1]} ${shared} --template-file src/_server/utils/migration-template.js`
} else if (script === 'm:list') {
	command = `migrate list ${shared}`
}

// RUN IT!
if (script.match(/^m:test:/)) {
	const command = script.split('m:test:')[1]
	console.log(`--- TESTING '${command}' MIGRATION ONLY --->`)
	require(`../data/migrations/${getMigration('up')}`)[command]()
	// spawn('node -r esm src/_server/data/migrations/1527054780080-add-repo-metadata.js', { stdio: 'inherit', shell: true })
} else {
	console.log(command)
	spawn(command, { stdio: 'inherit', shell: true })
}

// migration helper ----- >>>>>

function getMigration(direction) {
	let migrateFile = {}
	if (fs.existsSync(filename)) {
		migrateFile = JSON.parse(fs.readFileSync(filename, 'utf8'))
	}
	const migrations = globby.sync('./src/_server/data/migrations/**/*.js').map(path => path.split('/migrations/')[1])
	const lastRun = migrateFile.lastRun

	// console.log(migrations)
	// console.log(lastRun)

	if (direction === 'up') {
		const index = migrations.indexOf(lastRun)
		let next = migrations[index + 1]
		return next ? next : migrations[index]
	} else if (direction === 'down') {
		return lastRun || migrations[0]
	}
}
