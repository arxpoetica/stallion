import { validate } from '../_services/auth-check'

export async function get(req, res) {
	res.writeHead(200, { 'Content-Type': 'application/json' })
	const test = validate(req)
	if (test.unauthorized) {
		res.end(JSON.stringify(test))
	} else {
		res.end(JSON.stringify({ authentic: true }))
	}
}
