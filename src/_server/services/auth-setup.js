import config from '../build/config'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { Strategy as LocalStrategy } from 'passport-local'
// import { Strategy as GitHubStrategy } from 'passport-github'
import { driver } from '../db/arangodb-driver'
const db = driver.connect()

const Users = db.collection('users')
const prod = process.env.NODE_ENV === 'production'

export async function authSetup(app) {

	// FIXME: move this into routes!!!
	// FIXME: move this into routes!!!
	// FIXME: move this into AND SERVER!!!
	// FIXME: move this into routes!!!
	// FIXME: move this into routes!!!

	// SEE: https://medium.com/front-end-hacking/learn-using-jwt-with-passport-authentication-9761539c4314
	// AND: https://scotch.io/@devGson/api-authentication-with-json-web-tokensjwt-and-passport
	// AND: https://blog.usejournal.com/sessionless-authentication-withe-jwts-with-node-express-passport-js-69b059e4b22c

	passport.use(new LocalStrategy(async(username, password, done) => {
		// console.log(' --->>> LocalStrategy'.green)
		// console.log('username:', username)
		// console.log('password:', password)
		try {
			const cursor = await Users.byExample({ _key: username })
			if (cursor.count === 1) {
				const user = await cursor.next()

				const match = await bcrypt.compare(password, user.hash)
				if (!match) {
					return done(null, false, { message: 'Incorrect password.', status: 1 })
				}

				user.username = user._key
				delete user._id
				delete user._key
				delete user._rev
				delete user.hash
				// delete user.created
				delete user.modified
				done(null, user)
			} else {
				return done(null, false, { message: `${username} does not exist. Make it so?`, status: 2 })
			}
		} catch (error) {
			done(error)
		}
	}))

	app.use(passport.initialize())

	app.post('/auth/local/login', (req, res) => {
		passport.authenticate('local', { session: false, successRedirect: '/', failureRedirect: '/login' }, (err, user, results) => {
			if (err || !user) {
				console.log('----------------DEBUGGING >>> passport.authenticate')
				console.log('user', user, results)
				console.log('err', err)
				console.log('err JSON', JSON.stringify(err))
				console.log('----------------DEBUGGING >>> passport.authenticate END END END')
				return res.status(400).json(Object.assign({ user: user ? user : false }, results))
			}
			req.login(user, { session: false }, error => {
				if (error) {
					res.send(error)
				}
				// generate a signed son web token with the contents of user object and return it in the response
				const month = 60 * 60 * 24 * 30
				const token = jwt.sign(user, config.STALLION_JWT_SECRET, { expiresIn: month })
				return res.cookie('stallion', token, {
					httpOnly: prod,
					secure: prod,
					maxAge: 1000 * month,
				}).json(user)
			})
		})(req, res)
	})

	app.post('/auth/logout', (req, res) => {
		res.clearCookie('stallion')
		req.logout()
		res.end('ok')
	})

}
