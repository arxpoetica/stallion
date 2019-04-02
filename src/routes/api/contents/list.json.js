import { driver } from '../../../_server/db/arangodb-driver.js'
const db = driver.connect()

export async function get(req, res) {
	const Contents = db.collection('contents')
	const cursor = await Contents.all()
	const list = await cursor.all()
	const contents = list.map(item => {
		return {
			id: item._key,
			name: item.name,
			description: item.description,
		}
	})
	res.json(contents)
}
