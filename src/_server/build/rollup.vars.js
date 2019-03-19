// import { varsOnly } from './config'
// const rollupVars = {}
// for (let key in varsOnly) {
// 	if (key.match(/^STALLION_/)) {
// 		rollupVars[`process.env.${key}`] = JSON.stringify(varsOnly[key])
// 	}
// }
// rollupVars['process.env.NODE_ENV'] = JSON.stringify(process.env.NODE_ENV)
// console.log(rollupVars)
// export default rollupVars

// FIXME: some of this might land client side and shouldn't !!!

export default {
	'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
	'process.env.STALLION_ARANGODB_CONNECTION': JSON.stringify(process.env.STALLION_ARANGODB_CONNECTION),
	'process.env.STALLION_ARANGODB_DB': JSON.stringify(process.env.STALLION_ARANGODB_DB),
	'process.env.STALLION_ARANGODB_PASSWORD': JSON.stringify(process.env.STALLION_ARANGODB_PASSWORD),
	'process.env.STALLION_ARANGODB_USERNAME': JSON.stringify(process.env.STALLION_ARANGODB_USERNAME),
	'process.env.STALLION_ORIGIN': JSON.stringify(process.env.STALLION_ORIGIN),
	'process.env.STALLION_JWT_SECRET': JSON.stringify(process.env.STALLION_JWT_SECRET),
}
