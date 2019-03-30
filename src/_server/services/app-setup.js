import { log } from '../utils/db-tools.js'
import { driver } from '../db/arangodb-driver.js'
const db = driver.connect()

export async function appSetup(app) {

	// FIXME: restart app after running the following: ??????????

	const Users = db.collection('users')
	const exists = await Users.exists()
	if (!exists) {
		log(await Users.create(), 'Creating `Users` collection')
		console.log()
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
