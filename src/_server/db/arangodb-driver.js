// https://docs.arangodb.com/devel/Drivers/JS/Reference
import arangojs from 'arangojs'
const databases = {}

export const driver = {

	connect: function(name) {
		if (databases[name]) {
			return databases[name]
		}
		databases[name] = arangojs({ url: process.env.STALLION_ARANGODB_CONNECTION })
		databases[name].useDatabase(name || process.env.STALLION_ARANGODB_DB)
		databases[name].useBasicAuth(process.env.STALLION_ARANGODB_USERNAME, process.env.STALLION_ARANGODB_PASSWORD)
		return databases[name]
	},

}
