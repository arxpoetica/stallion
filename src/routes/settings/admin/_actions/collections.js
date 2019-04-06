export default {

	// list: async(collection) => await db.listCollections(true),
	list: async() => { return { error: 1, message: 'this endpoint needs to be aligned w/ GQL.' } },

	// getData: async(collection) => await api.getAll(collection),
	getData: async() => { return { error: 1, message: 'this endpoint needs to be aligned w/ GQL.' } },

	// remove: async(key) => {
	// 	try {
	// 		log(await api.remove('schemas', key), `ADMIN: "${key}" schema document removed`)
	// 		const edgeExists = await api.get('repo-has-schema', key)
	// 		if (edgeExists) {
	// 			log(await api.remove('repo-has-schema', key), `ADMIN: repo has schema "${key}" edge removed`)
	// 		}
	// 		return { removed: true, id: key }
	// 	} catch (error) {
	// 		// TODO: set codes. I'm assuming `1` means "500"???
	// 		return { errorcode: 1, error: 'Schema not deleted.' }
	// 	}
	// },

}
