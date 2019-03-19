// FIXME: these mutations might be more easily
// handled with GraphQL mutations????

import { validate } from '../../_services/auth-check'
import collections from './_actions/collections'

export async function post(req, res) {

	const user = validate(req)
	if (user.plan === 'admin') {
		const action = req.body.action
		const key = req.body.key
		let actionResponse = { errorcode: 3, message: 'Unknown error.' }


		if (action === 'collections.list') {
			actionResponse = await collections.list()
		} else if (action === 'collections.getData') {
			actionResponse = await collections.getData(key)
		// } else if (action === 'schema.remove') {
		// 	actionResponse = await schema.remove(key)
		}

		res.json(actionResponse)

	} else {
		// TODO: set codes. I'm assuming `2` means "not admin"
		res.json({ errorcode: 2, error: 'Access denied' })
	}

}
