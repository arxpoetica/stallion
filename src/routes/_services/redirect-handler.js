export default function(options) {

	options = options ? options : {}
	options = typeof options === 'function' ? { cb: options } : options
	// default is to hide 'private'
	options.hide = options.hide || 'private'

	return function(vars) {
		const { user } = this.store.get()
		if (options.hide === 'private') {
			if (!user) { return this.redirect(302, '') }
		} else {
			if (user) { return this.redirect(302, '') }
		}
		if (typeof options.cb === 'function') {
			options.cb(vars)
		}
	}

}
