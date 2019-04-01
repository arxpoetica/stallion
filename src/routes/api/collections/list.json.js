import { driver } from '../../../_server/db/arangodb-driver.js'
const db = driver.connect()

export async function get(req, res) {
	const list = await db.listCollections()
	const collections = list
		.filter(item => item.name.indexOf('stallion-') === 0)
		.map(item => {
			return {
				id: item.id,
				name: item.name.split('stallion-')[1],
				type: item.type,
			}
		})
	res.json(collections)
}
