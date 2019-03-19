export default {

	// TODO: right now this only works on table-like data
	rawCleanup(row) {
		delete row._key
		delete row._id
		delete row._rev
		return row
	},

	keyToId(obj) {
		obj.id = obj._key
		return obj
	},

	user(user) {
		user.username = user._key
		return user
	},

}
