import { log } from '../../../_server/utils/db-tools.js'
import { driver } from '../../../_server/db/arangodb-driver.js'
const db = driver.connect()

export async function post(req, res) {

	try {
		let { name, description } = req.body

		// purifying it's soul
		name = name
			.toLowerCase()
			.replace(/[^a-z0-9-]+/g, '')
			.replace(/-+/g, '-')
			.replace(/^-|-$/g, '')

		const collectionName = `stallion-${name}`
		const Collection = db.collection(collectionName)
		const exists = await Collection.exists()
		if (!exists) {
			// create the collection
			log(await Collection.create(), `Creating "${name}" collection`)

			// save the collection information
			const Collections = db.collection('collections')
			const info = await Collections.save({ name, description })
			log(info, `Saving "${name}" doc info to Collections collection`)

			res.json({
				id: info._key,
				name,
				description,
			})
		} else {
			throw new Error('Collection already exists.')
		}
	} catch (error) {
		res.json({ error: 1, message: error.message })
	}

}
