import { getSchema } from '../graphql-api/schema.js'
import graphqlHTTP from 'express-graphql'

const env = process.env.NODE_ENV
const development = env === 'development'

export async function graphqlSetup(app) {

	// TODO: add try / catch block?
	let schema = await getSchema()

	// TODO: use `graphql-crunch` https://github.com/banterfm/graphql-crunch
	// https://github.com/graphql/express-graphql/issues/71
	app.use('/api/pure-graphql', graphqlHTTP({
		schema,
		graphiql: process.env.STALLION_USE_GRAPHIQL === 'true',
		pretty: development,
		// rootValue: {}, // ???
		// context: { req, res }, // ???
		// context: ???,
		// credentials: 'same-origin',
	}))

}
