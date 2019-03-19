// TODO: throw this in an npm repository ???

export const camelToKebab = str => str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
export const kebabToCamel = str => str.replace(/-([a-z])/g, $1 => $1[1].toUpperCase())
export const fastClone = obj => JSON.parse(JSON.stringify(obj)) // https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/5344074#5344074

export const concatStyles = styles => {
	let concatenatedStyles = ''
	for (let index in styles) {
		// console.log(`${index}:${styles[index]};`)
		concatenatedStyles += `${index}:${styles[index]};`
	}
	return concatenatedStyles
}

export const wrapTag = (tag, content) => `<${tag}>${content}</${tag}>`



// NOTE: might write my own helpers?
// https://medium.com/@abustamam/for-loops-vs-foreach-in-javascript-7a977278a39e
