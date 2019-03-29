import fetch from 'cross-fetch'

export const graphQuery = async function(query, convertRawKeys) {
	convertRawKeys = convertRawKeys ? convertRawKeys : []
	convertRawKeys = Array.isArray(convertRawKeys) ? convertRawKeys : [convertRawKeys]
	const res = await fetch(`${process.env.STALLION_HOST}/api/pure-graphql`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
		body: JSON.stringify({ query }),
	})
	const json = await res.json()
	convertRawKeys.forEach(key => {
		json.data[key] = JSON.parse(json.data[key])
	})
	return json.data
}

export const graphqlFormat = data => {
	let props = []
	for (let key in data) {
		props.push(`${key}:${JSON.stringify(data[key])}`)
	}
	return `{ ${props.join(',')} }`
}

export const GET = async function(url) {
	const res = await fetch(process.env.STALLION_HOST + url, {
		method: 'GET',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
	})
	try { return await res.json() } catch (error) { return undefined }
}

export const POST = async function(url, body) {
	body = body || {}
	const res = await fetch(process.env.STALLION_HOST + url, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
		body: JSON.stringify(body),
	})
	try { return await res.json() } catch (error) { return undefined }
}
