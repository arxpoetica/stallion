import path from 'path'
import { loadTypes, loadResolvers } from './utils/graphql-utils'
import { makeExecutableSchema } from 'graphql-tools'

export async function getSchema() {

	try {
		// load all graphql type definitions from `.gql` files
		const typePaths = path.resolve(process.cwd(), 'src/_server/graphql-api/models/**/*.gql')
		const typeDefs = await loadTypes(typePaths)
		// console.log(typePaths)
		// console.log(typeDefs)

		// load all graphql resolvers from `.map.js` files
		const resolverPaths = path.resolve(process.cwd(), 'src/_server/graphql-api/models/**/*.map.js')
		const resolvers = await loadResolvers(resolverPaths)
		// console.log(resolverPaths)
		// console.log(resolvers)

		// Put together a schema
		return makeExecutableSchema({
			typeDefs,
			resolvers,
			// FIXME: should be dev only:
			logger: { log: error => console.log(error) },
		})
	} catch (error) {
		throw new Error(error)
	}

}
