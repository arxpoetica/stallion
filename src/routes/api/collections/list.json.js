import { driver } from '../../../_server/db/arangodb-driver.js'
const db = driver.connect()

export async function get(req, res) {
	const Collections = db.collection('collections')
	const cursor = await Collections.all()
	const list = await cursor.all()
	const collections = list.map(item => {
		return {
			id: item._key,
			name: item.name,
			description: item.description,
		}
	})
	res.json(collections)
}
