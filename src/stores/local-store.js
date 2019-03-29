/* global localStorage */

import { writable } from 'svelte/store'
const storage = typeof localStorage !== 'undefined' ? localStorage : {
	removeItem: key => { if (storage[key]) { delete storage[key] } },
}

/**
 * Tracks storage both in `localStorage` and in svelte's `writable` stores
 * Usage: `const name = storable('name', 'jimmy')`
 * @param {string} key		- `localStorage` key
 * @param {any} value		- default/initial value (if value is already set in `localStorage`, it will load that value instead)
 * @param {Function} fn		- handed off to `writable`
 */

export const storable = (key, value, fn) => {
	key = `stallion.store.${key}`
	if (storage[key]) { value = JSON.parse(storage[key]) }

	const store = writable(value, fn)
	store.subscribe(value => {
		if (value === undefined) {
			storage.removeItem(key)
		} else {
			storage[key] = JSON.stringify(value)
		}
	})

	store.remove = () => store.set(undefined)

	return store
}
