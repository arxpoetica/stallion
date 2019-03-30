// import { log } from '../../../_server/utils/db-tools.js'
import { driver } from '../../../_server/db/arangodb-driver.js'
const db = driver.connect()

export async function get(req, res) {
	const list = await db.listCollections()
	const collections = list.map(item => {
		return {
			id: item.id,
			name: item.name,
			type: item.type,
		}
	})
	res.json(collections)
}
