import { varsOnly } from './config'
const rollupVars = {}
for (let key in varsOnly) {
	if (key.match(/^STALLION_/)) {
		rollupVars[`process.env.${key}`] = JSON.stringify(varsOnly[key])
	}
}
rollupVars['process.env.NODE_ENV'] = JSON.stringify(process.env.NODE_ENV)
rollupVars['process.env.PORT'] = JSON.stringify(process.env.PORT)
// console.log(varsOnly)
// console.log(rollupVars)

export default rollupVars
