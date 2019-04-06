// FIXME: config should work
// import config from './_server/build/config'
import { white, green } from 'ansi-colors'
import { GraphQLServer } from 'graphql-yoga'

import { prisma } from './_server/prisma/generated/prisma-client'
import { resolvers } from './_server/prisma/resolvers'
import { permissions } from './_server/prisma/permissions'

import morgan from 'morgan'
import helmet from 'helmet'
import compression from 'compression'
import sirv from 'sirv'
// import { appSetup } from './_server/services/app-setup.js'
// import { authSetup } from './_server/services/auth-setup.js'
// import { validate } from './routes/_services/auth-check.js'
import * as sapper from '@sapper/server'

const { PORT, NODE_ENV } = process.env
const development = NODE_ENV === 'development'

// https://www.joyent.com/node-js/production/design/errors
// TODO: https://shapeshed.com/uncaught-exceptions-in-node/
// handle all uncaught exceptions
// see - https://nodejs.org/api/process.html#process_event_uncaughtexception
process.on('uncaughtException', error => console.error('Uncaught Exception:'.red, error))
// handle all unhandled promise rejections
// see - http://bluebirdjs.com/docs/api/error-management-configuration.html#global-rejection-events
// or for latest node - https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', error => console.error('Unhandled Rejection:'.red, error))

// ---> FOOTGUN!?
async function start() {

	// NOTE: order matters!!! https://github.com/jaredhanson/passport/issues/14#issuecomment-4863459

	const server = new GraphQLServer({
		typeDefs: 'src/_server/prisma/schema.graphql',
		resolvers,
		middlewares: [permissions],
		context: request => {
			return {
				...request,
				prisma,
			}
		},
	})
	const app = server.express

	app.use(morgan(development ? 'dev' : 'combined', {
		skip: (req, res) => development ? false : res.statusCode < 400,
	}))

	// SEE: https://expressjs.com/en/advanced/best-practice-security.html
	app.use(helmet())
	app.set('trust proxy', 1) // trust first proxy

	app.use(compression({ threshold: 0 }))
	app.use(sirv('static', { development }))

	// await appSetup(app)
	// await authSetup(app)

	app.use(sapper.middleware({
		session: req => {
			// const user = validate(req)
			const user = false
			return {
				env: NODE_ENV,
				user: user.unauthorized ? null : user,
				// req: req,
			}
		},
	}))

	// server.start(() => console.log('Server is running on http://localhost:4000'))
	app.listen(PORT, setTimeout(() => {
		console.log()
		console.log('          ,~~_')
		console.log('          |/\\ =_ _ ~')
		console.log('           _( )_( )\\~~')
		console.log('           \\,\\  _|\\ \\~~~')
		console.log('              \\`   \\')
		console.log('              `    `')
		console.log()
		console.log('     ~~~   Stallion   ~~~   Headless CMS built atop Svelte and Sapper.')
		console.log()
		console.log(green(`     listening at ${white(process.env.STALLION_HOST)} in ${white(NODE_ENV)} mode on process ${white(process.pid)}`))
		// console.log(JSON.stringify(process.env, null, 2))
		if (development) {
			console.log(green(`     Running ${white(`${process.env.STALLION_HOST}/graphiql`)} in development mode only...`))
		}
		console.log()
	}, 100))

}

start()
