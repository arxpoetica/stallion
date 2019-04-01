import { log } from '../../../_server/utils/db-tools.js'
import { driver } from '../../../_server/db/arangodb-driver.js'
const db = driver.connect()

export async function post(req, res) {

	try {
		const { name } = req.body
		const collectionName = `stallion-${name}`
		const Collection = db.collection(collectionName)
		const exists = await Collection.exists()
		if (exists) {
			const info = await Collection.drop()
			log(info, `Dropping "${name}" collection`)
			res.json({ success: 1, message: 'All went well.' })
		} else {
			throw new Error('Collection does not exist.')
		}
	} catch (error) {
		res.json({ error: 1, message: error.message })
	}

}
