// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'
// import config from '../../_server/build/config.js'
// const prod = process.env.NODE_ENV === 'production'

export async function post(req, res) {
	// try {
	// 	const { username, email, password } = req.body

	// 	// FIXME: perform *** ALL *** validation tasks
	// 	const keyExists = await api.get('users', username)
	// 	const emailExists = await api.find('users', { email })

	// 	if (keyExists || emailExists) {
	// 		res.end(JSON.stringify({ keyExists: !!keyExists, emailExists: !!emailExists }))
	// 	}

	// 	const user = await api.set('users', {
	// 		_key: username,
	// 		created: Date.now(),
	// 		modified: Date.now(),
	// 		email,
	// 		// bio: '',
	// 		avatar: `/img/no-avatar-${Math.floor(Math.random() * 6) + 1}.png`,
	// 		displayName: username,
	// 		// first: '',
	// 		// last: '',
	// 		hash: await bcrypt.hash(password, 10),
	// 		role: 'free', // for now
	// 	})

	// 	user.username = user._key
	// 	delete user._id
	// 	delete user._key
	// 	delete user._rev
	// 	delete user.hash

	// 	// generate a signed son web token with the contents of user object and return it in the response
	// 	const month = 60 * 60 * 24 * 30
	// 	const token = jwt.sign(user, config.STALLION_JWT_SECRET, { expiresIn: month })
	// 	res.cookie('stallion', token, {
	// 		httpOnly: prod,
	// 		secure: prod,
	// 		maxAge: 1000 * month,
	// 	})
	// 	res.status(200).send({ user })
	// } catch (error) {
	// 	res.status(400).send({ error: 'req body should take the form { username, password }' })
	// }
	res.json({ error: 1, message: 'this endpoint needs to be aligned w/ GQL.' })
}
