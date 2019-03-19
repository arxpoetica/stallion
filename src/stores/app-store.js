import { writable/* , readable, derive */ } from 'svelte/store'

export const target = writable(null)

// if (process.env.NODE_ENV === 'development') {
// 	store.set({ dump: json => JSON.stringify(json) })
// 	window.store = store
// }
