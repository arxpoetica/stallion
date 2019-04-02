import { log } from '../../../_server/utils/db-tools.js'
import { driver } from '../../../_server/db/arangodb-driver.js'
const db = driver.connect()

export async function post(req, res) {

	try {
		const { _key, name } = req.body
		const contentName = `stallion-${name}`
		const Content = db.collection(contentName)
		const exists = await Content.exists()
		if (exists) {
			// delete the content
			log(await Content.drop(), `Dropping "${name}" Content collection`)

			// delete the content information
			const Contents = db.collection('contents')
			log(await Contents.remove(_key), `Removing "${name}" doc info from Contents content`)

			res.json({ success: 1, message: 'All went well.' })
		} else {
			throw new Error('Content does not exist.')
		}
	} catch (error) {
		res.json({ error: 1, message: error.message })
	}

}
