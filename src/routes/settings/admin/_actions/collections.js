// import { log } from '../../../../_server/utils/db-tools.js'
import { getApi } from '../../../../_server/db/arangodb-api'
const api = getApi()
import { driver } from '../../../../_server/db/arangodb-driver'
const db = driver.connect()

export default {

	list: async(collection) => await db.listCollections(true),

	getData: async(collection) => await api.getAll(collection),

	// remove: async(key) => {
	// 	try {
	// 		log(await api.remove('schemas', key), `ADMIN: "${key}" schema document removed`)
	// 		const edgeExists = await api.get('repo-has-schema', key)
	// 		if (edgeExists) {
	// 			log(await api.remove('repo-has-schema', key), `ADMIN: repo has schema "${key}" edge removed`)
	// 		}
	// 		return { removed: true, id: key }
	// 	} catch (error) {
	// 		// TODO: set codes. I'm assuming `1` means "500"???
	// 		return { errorcode: 1, error: 'Schema not deleted.' }
	// 	}
	// },

}
