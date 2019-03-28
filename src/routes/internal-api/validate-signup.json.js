import { emailRegex } from '../../_server/db/validators/generic'
import { getApi } from '../../_server/db/arangodb-api'
const api = getApi()

export async function post(req, res) {
	let message = ''
	res.writeHead(200, { 'Content-Type': 'application/json' })
	try {
		if (req.body.type === 'username') {
			const found = await api.find('users', req.body.filters)
			if (found) {
				message = 'That username is already in use.'
			}
			res.end(JSON.stringify({ valid: !found, message }))
		} else if (req.body.type === 'email') {
			let valid = emailRegex.test(req.body.filters.email)
			if (!valid) {
				// TODO: move this to the front end?
				message = 'Email is invalid.'
			} else {
				const found = await api.find('users', req.body.filters)
				if (found) {
					message = 'Email is already taken.'
					valid = false
				}
			}
			res.end(JSON.stringify({ valid, message }))
		}
		res.end({ valid: false, message: 'Something went wrong. Please <a href="/contact">contact us</a> for help.' })
	} catch (error) {
		res.end({ valid: false, message: 'Something went wrong. Please <a href="/contact">contact us</a> for help.' })
	}
}
