import mappers from '../../utils/mappers'
import { getApi } from '../../../db/arangodb-api'
const api = getApi()

export default {
	Query: {
		users: async function() {
			const users = await api.getAll('users')
			return users.map(user => mappers.user(user))
		},
		user: async function(_, { username }) {
			const user = await api.get('users', username)
			return mappers.user(user)
		},
	},
	// Mutation: {
	// 	addUser: (_, data) => {
	// 		const uid = uuid()
	// 		users[uid] = Object.assign({}, data, {
	// 			id: uid,
	// 		})
	// 		return friendsMapper(uid)
	// 	},
	// },
	User: {
		posts: async(user) => {
			const posts = await api.traverse('users', user.username, 'user-has-post')
			return posts.map(post => mappers.keyToId(post))
		},
	},
}
