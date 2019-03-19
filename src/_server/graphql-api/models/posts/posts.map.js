import mappers from '../../utils/mappers'
import { getApi } from '../../../db/arangodb-api'
const api = getApi()

export default {
	Query: {
		post: async function(_, { id }) {
			const post = await api.get('posts', id)
			return mappers.keyToId(post)
		},
		posts: async function() {
			const posts = await api.getAll('posts')
			return posts.map(post => mappers.keyToId(post))
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
	// Post: {
	// 	comments: async(post) => {
	// 		// TODO: are we going to traverse at any time?????
	// 		// const comments = await api.traverse('posts', post._key, 'post-has-comment')
	// 		const comments = await api.getAll('comments', post.commentKeys)
	// 		return comments.map(comment => mappers.keyToId(comment))
	// 	},
	// },
}
