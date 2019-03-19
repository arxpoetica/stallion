// FIXME: no longer needed...but the technique for dynamic GQL queries could be VERY useful...
// FIXME: no longer needed...but the technique for dynamic GQL queries could be VERY useful...
// FIXME: no longer needed...but the technique for dynamic GQL queries could be VERY useful...
// FIXME: no longer needed...but the technique for dynamic GQL queries could be VERY useful...
// FIXME: no longer needed...but the technique for dynamic GQL queries could be VERY useful...
// FIXME: no longer needed...but the technique for dynamic GQL queries could be VERY useful...
// FIXME: no longer needed...but the technique for dynamic GQL queries could be VERY useful...


import { validate } from '../../_services/auth-check'
import { graphql } from 'graphql'
import { makeExecutableSchema } from 'graphql-tools'
import { getApi } from '../../../_server/db/arangodb-api'
const api = getApi()
// import mappers from '../../../_server/graphql-api/utils/mappers'

const matchTypes = {
	string: 'String',
	integer: 'Int',
	number: 'Int',
	// float: 'Float',
	// boolean: 'Boolean',
}

export async function get(req, res) {
	parseRequest(req, res)
}

export async function post(req, res) {
	parseRequest(req, res)
}

async function parseRequest(req, res) {
	res.writeHead(200, { 'Content-Type': 'application/json' })

	// TODO: check some kind of auth setting
	// SSH? Token? bearer? password? etc.?
	const { params } = req

	if (params.profile) {
		if (params.dataset) {

			const key = `${params.profile}-${params.dataset}`
			const repo = await api.get('repos', key)
			const schema = await api.get('repos', key)

			if (repo.private) {
				const test = validate(req)
				if (test.unauthorized) {
					res.end(test.message)
					return
				}
			}

			const typeDefParts = repo.headers.map(header => {
				// FIXME: what to do with multiple types?
				// SEE: https://github.com/apollographql/apollo-server/issues/71
				// ALSO: https://graphql.org/learn/schema/#union-types
				// ALSO: https://medium.com/the-graphqlhub/graphql-tour-interfaces-and-unions-7dd5be35de0d
				// FOR NOW, just allowing first type - - LAME
				let type = schema.properties[header].type
				type = Array.isArray(type) ? type[0] : type
				const normalizedHeader = header.replace(/\W/g, '')
				return `${normalizedHeader}: ${matchTypes[type]}`
			}).join('\n')

			// POTENTIAL QUERIES:
			// arxpoetica-star-wars-films/17127344
			// arxpoetica-narnia-books/17127376
			// arxpoetica-narnia-books/17127382
			// http://localhost:3000/api/arxpoetica/star-wars-films?query={rows{Title}}
			// http://localhost:3000/api/arxpoetica/star-wars-films?query={row(id:"17127344"){Title}}

			const query = req.body.query || req.query.query
			// console.log(query)

			// TODO: create & load the schema from the database
			const typeDefs = `
				type Row {
					${typeDefParts}
				}
				type Query {
					rows: [Row]
					row(id: String!): Row
				}
			`
			const resolvers = {
				Query: {
					rows: async() => await datasetsApi.getAll(key),
					row: async(_, { id }) => await datasetsApi.get(key, id),
				},
			}
			// FIXME: logger should be dev only:
			const logger = { log: error => console.log(error) }
			const GQLSchema = makeExecutableSchema({ typeDefs, resolvers, logger })
			const response = await graphql(GQLSchema, query)
			res.end(JSON.stringify(response.data))
		} else {
			sendApiError(res, 'TODO: send down a list of all datasets? And other useful profile information?')
		}
	} else {
		sendApiError(res, 'Incorrect endpoint')
	}
}

function sendApiError(res, message) {
	res.end(JSON.stringify({ message }))
}
