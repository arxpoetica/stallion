import { log } from '../../../_server/utils/db-tools.js'
import { driver } from '../../../_server/db/arangodb-driver.js'
const db = driver.connect()

export async function post(req, res) {

	try {
		const { name, description } = req.body
		const collectionName = `stallion-${name}`
		const Collection = db.collection(collectionName)
		const exists = await Collection.exists()
		if (!exists) {
			const info = await Collection.create()
			log(info, `Creating "${name}" collection`)
			res.json({
				id: info.id,
				name: name,
				type: info.type,
			})
		} else {
			throw new Error('Collection already exists.')
		}
	} catch (error) {
		res.json({ error: 1, message: error.message })
	}

}
