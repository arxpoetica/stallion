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

		const contentName = `stallion-${name}`
		const Content = db.collection(contentName)
		const exists = await Content.exists()
		if (!exists) {
			// create the content
			log(await Content.create(), `Creating "${name}" Content collection`)

			// save the content information
			const Contents = db.collection('contents')
			const info = await Contents.save({ name, description })
			log(info, `Saving "${name}" doc info to Contents collection`)

			res.json({
				id: info._key,
				name,
				description,
			})
		} else {
			throw new Error('Content already exists.')
		}
	} catch (error) {
		res.json({ error: 1, message: error.message })
	}

}
