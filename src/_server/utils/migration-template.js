import { log } from '../../utils/migration-tools'
// import { getApi } from '../../db/arangodb-api.js'
// const api = getApi()
import { driver } from '../../db/arangodb-driver'
const db = driver.connect()

// const Graph = db.graph('graph')
// const Collection = db.collection('collection')

export const up = async function() {

	try {

		// ------------------------------ >>>
		// data loading
		// ------------------------------ >>>

		// const migrationData = require('../migrations-data/___')

		// ------------------------------ >>>
		// main_action
		// ------------------------------ >>>

		// ----- >>> sub_actions

		// log()

	} catch (error) {
		console.log('ERROR:', error)
	}

}

export const down = async function() {
}
