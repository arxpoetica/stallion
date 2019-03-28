// TODO: OUTPUT IN DEVELOPMENT (AND PRODUCTION???) ARANGODB ACTIVITY LOGS
// TODO: OUTPUT IN DEVELOPMENT (AND PRODUCTION???) ARANGODB ACTIVITY LOGS
// TODO: OUTPUT IN DEVELOPMENT (AND PRODUCTION???) ARANGODB ACTIVITY LOGS

// import { aql } from 'arangojs'
import { driver } from './arangodb-driver'

export const getApi = name => {

	const db = driver.connect(name)

	return {

		get: async function(collection, key) {
			if (!collection) { throw new Error('No collection set in `get`') }
			if (!key) { throw new Error('No key set in `get`') }
			const query = `
				FOR document IN \`${collection}\`
					FILTER document._key == @key
					RETURN document
			`
			const cursor = await db.query(query, { key })
			return cursor.next()
		},

		getAll: async function(collection, keys) {
			if (!collection) { throw new Error('No collection set in `getAll`') }
			keys = keys || []
			keys = Array.isArray(keys) ? keys : [keys]
			const query = `
				FOR document IN \`${collection}\`
					${keys.length ? 'FILTER document._key IN @keys' : ''}
					LIMIT 100
					RETURN document
			`
			const queryPromise = keys.length ? db.query(query, { keys }) : db.query(query)
			const cursor = await queryPromise
			return await cursor.all()
		},

		set: async function(collection, doc) {
			if (!collection) { throw new Error('No collection set in `set`') }
			if (!doc) { throw new Error('No document set in `set`') }
			const query = `
				INSERT ${JSON.stringify(doc)}
				INTO \`${collection}\`
				RETURN NEW
			`
			const cursor = await db.query(query)
			return cursor.next()
		},

		update: async function(collection, key, updates) {
			if (!collection) { throw new Error('No collection set in `update`') }
			if (!key) { throw new Error('No key set in `update`') }
			if (!updates) { throw new Error('No updates array set in `updates`') }
			const query = `
				UPDATE DOCUMENT("${collection}/${key}")
				WITH ${JSON.stringify(updates)}
				IN ${collection}
				OPTIONS { keepNull: false }
				RETURN NEW
			`
			const cursor = await db.query(query)
			return cursor.next()
		},

		remove: async function(collection, key) {
			if (!collection) { throw new Error('No collection set in `remove`') }
			if (!key) { throw new Error('No key set in `remove`') }
			const query = `REMOVE '${key}' IN \`${collection}\``
			const cursor = await db.query(query)
			return cursor.next()
		},

		drop: async function(collection) {
			if (!collection) { throw new Error('No collection set in `drop`') }
			const Collection = db.collection(collection)
			return await Collection.drop()
		},

		traverse: async function(originCollection, key, edgeCollection, depth) {
			if (!originCollection) { throw new Error('No origin collection set in `traverse`') }
			if (!key) { throw new Error('No key set in `traverse`') }
			if (!edgeCollection) { throw new Error('No edge collection set in `traverse`') }
			depth = depth || '1..1'
			const query = `
				FOR document IN ${depth} OUTBOUND "${originCollection}/${key}" \`${edgeCollection}\`
					LIMIT 100
					RETURN document
			`
			const cursor = await db.query(query)
			return await cursor.all()
		},

		// find a document by key & value
		find: async function(collection, filters) {
			try {
				if (!collection) { throw new Error('No collection set in `find`') }
				if (!filters) { throw new Error('No filters set in `find`') }
				let query = `FOR document IN \`${collection}\``
				for (let key in filters) {
					const value = filters[key]
					if (typeof value === 'string') {
						query += ` FILTER document.${key} == "${value}"`
					} else {
						query += ` FILTER document.${key} == ${value}`
					}
				}
				query += ' RETURN document'
				const cursor = await db.query(query)
				return cursor.next()
			} catch (error) {
				return { error: true, message: error.message ? error.message : 'Unknown error' }
			}
		},

	}

}
