export async function post(req, res) {
	// res.writeHead(200, { 'Content-Type': 'application/json' })
	// try {
	// 	res.end(req.body.type === 'username' ? await checkUsername(req) : await checkEmail(req))
	// } catch (error) {
	// 	res.end({ valid: false, message: 'Something went wrong. Please <a href="/contact">contact us</a> for help.' })
	// }
	res.json({ error: 1, message: 'this endpoint needs to be aligned w/ GQL.' })
}

// async function checkUsername(req) {
// 	let message = ''
// 	let valid = true
// 	const found = await api.find('users', req.body.filters)
// 	if (found && !found.error) {
// 		message = 'That username is already in use.'
// 		valid = false
// 	}
// 	return JSON.stringify({ valid, message })
// }

// async function checkEmail(req) {
// 	let message = ''
// 	let valid = emailRegex.test(req.body.filters.email)
// 	if (!valid) {
// 		// TODO: move this to the front end?
// 		message = 'Email is invalid.'
// 	} else {
// 		const found = await api.find('users', req.body.filters)
// 		if (found && !found.error) {
// 			message = 'Email is already taken.'
// 			valid = false
// 		}
// 	}
// 	return JSON.stringify({ valid, message })
// }
