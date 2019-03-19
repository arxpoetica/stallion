// SEE: https://github.com/tadejstanic/graphql-api-example/blob/f8a8dd4f19f25bee8a9d32005ae047e0b7edf4e0/src/lib/graphqlFileLoader.js

import fs from 'fs'
import path from 'path'
import util from 'util'
import { merge } from 'lodash'
import globby from 'globby'
const readFile = util.promisify(fs.readFile)

// FIXME: intend to use dynamic imports in the future:
import _mutationsMap from '../models/_mutations.map'
import _queriesMap from '../models/_queries.map'
import usersMap from '../models/users/users.map'
import postsMap from '../models/posts/posts.map'

export const loadTypes = async pattern => {
	try {
		const files = await globby(pattern)
		if (!files.length) { throw new Error('globby found zero GraphQL type definition files. What gives?') }
		const filePromises = files.map(filename => readFile(filename, 'utf8'))
		const loadedFiles = await Promise.all(filePromises)
		return loadedFiles.join('\n')
	} catch (error) {
		throw new Error(error)
	}
}

export const loadResolvers = async pattern => {
	try {
		const files = await globby(pattern)
		if (!files.length) { throw new Error }
		const imports = files.map(filename => filename.split('/src/_server/graphql-api/models/')[1])


		// FIXME: this is just some warning: delete when below is also fixed
		// FIXME: this is just some warning: delete when below is also fixed
		// FIXME: this is just some warning: delete when below is also fixed
		setTimeout(() => {
			const declaredImports = [
				'../models/_mutations.map.js',
				'../models/_queries.map.js',
				'../models/users/users.map.js',
				'../models/posts/posts.map.js',
			]
			for (let item of imports) {
				const found = declaredImports.find(declared => declared.indexOf(item) > -1)
				// console.log(item, found)
				if (!found) {
					console.log('ERROR!'.red, `You need to include ${item} in the imports in the graphql-utils.js file`.yellow)
				}
			}
		}, 200)

		// FIXME: use dynamic import in the future
		const loadedModules = [
			_mutationsMap,
			_queriesMap,
			usersMap,
			postsMap,
		]

		// // FIXME: rollup doesn't yet do dynamic imports with variables
		// // FIXME: rollup doesn't yet do dynamic imports with variables
		// // FIXME: rollup doesn't yet do dynamic imports with variables
		// // SEE: https://github.com/rollup/rollup/issues/2097
		// // AND: https://github.com/rollup/rollup/issues/2092
		// const modulePromises = [
		// 	import('../models/_mutations.map.js'),
		// 	import('../models/_queries.map.js'),
		// 	import('../models/users/users.map.js'),
		// 	import('../models/posts/posts.map.js'),
		// ]
		// // const modulePromises = imports.map(importPath => import('../models/' + importPath))
		// // return merge(...loadedModules.default)
		// const loadedModules = await Promise.all(modulePromises)

		return merge(...loadedModules)
	} catch (error) {
		throw new Error(error)
	}
}
