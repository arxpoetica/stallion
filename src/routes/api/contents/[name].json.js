import { driver } from '../../../_server/db/arangodb-driver.js'
const db = driver.connect()
const Contents = db.collection('contents')

export async function post(req, res) {

	try {
		let { name } = req.body
		const content = await Contents.firstExample({ name })
		if (content) {
			res.json(content)
		} else {
			throw new Error(`Can't find content with name: ${name}.`)
		}
	} catch (error) {
		res.json({ error: 1, message: error.message })
	}

}
