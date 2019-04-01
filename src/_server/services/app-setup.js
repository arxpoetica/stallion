import { log } from '../utils/db-tools.js'
import { driver } from '../db/arangodb-driver.js'
const db = driver.connect()

export async function appSetup(app) {

	// FIXME: restart app after running the following: ??????????

	const Users = db.collection('users')
	let exists = await Users.exists()
	if (!exists) {
		log(await Users.create(), 'Creating `Users` collection')
	}

	const Collections = db.collection('collections')
	exists = await Collections.exists()
	if (!exists) {
		log(await Collections.create(), 'Creating `Collections` collection')
	}
	const News = db.collection('stallion-news')
	exists = await News.exists()
	if (!exists) {
		log(await News.create(), 'Creating `News` collection')
		log(await Collections.save({ name: 'news', description: 'Add news or posts to your site.' }))
	}
	const Tags = db.collection('stallion-tags')
	exists = await Tags.exists()
	if (!exists) {
		log(await Tags.create(), 'Creating `Tags` collection')
		log(await Collections.save({ name: 'tags', description: 'Tag items for your site.' }))
	}

	// check if app needs to be initialized / setup
	const cursor = await Users.all()
	if (cursor.count === 0) {
		app.get('*', (req, res, next) => {
			if (
				req.originalUrl.indexOf('/client/') === 0 ||
				req.originalUrl.indexOf('/api/') === 0 ||
				req.originalUrl === '/setup'
			) {
				return next()
			}
			// server = res.connection.server
			res.redirect('/setup')
		})
	} else {
		app.get('/setup', (req, res) => {
			res.redirect('/')
		})
	}

}
