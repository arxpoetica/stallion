export const post = async function(fetch, body) {
	body = body || {}
	const res = await fetch('/settings/admin/actions.json', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		credentials: 'same-origin',
		body: JSON.stringify(body),
	})
	return await res.json()
}
