// TODO: rename

// https://developer.mozilla.org/en-US/docs/Web/CSS/length
export const units = [/* 'auto',  */'%', 'px', 'em', 'rem', 'vh', 'vw', 'vmin', 'vmax']
export const transformUnits = [...units, 'deg', 'turn']

export const dimensions = ['width', 'height']
export const position = ['top', 'right', 'bottom', 'left']
export const properties = [...dimensions, ...position]

// TODO: parse out unit???
export const parseDeclaration = function(property, value) {

	const decl = {
		property,
		// default is one segment, but note there could be more than one, as is the case w/ transform
		segments: [],
	}

	let parsedValue = parseFloat(value)
	const isNumber = !Number.isNaN(parsedValue)

	if (property === 'transform') {
		const segments = value.split(' ').map(segment => {
			const parts = segment.split(/[()]/g)
			const value = parseFloat(parts[1])
			const unit = parts[1].split(value)[1]
			return {
				prefix: parts[0] + '(',
				value,
				unit,
				suffix: ')',
			}
		})
		decl.segments = segments
	} else if (isNumber && typeof value === 'string') {
		const parts = value.split(parsedValue)
		decl.segments.push({
			prefix: parts[0],
			value: parsedValue,
			unit: parts[1],
			suffix: '',
		})
	} else {
		decl.segments.push({ prefix: '', value, unit: '', suffix: '' })
	}
	return decl
}

export const getDeclarationParts = parsedDecl => {
	return {
		property: parsedDecl.property,
		// TODO: some of these will be joined by commas, not just spaces
		value: parsedDecl.segments.map(segment => `${segment.prefix}${segment.value}${segment.unit}${segment.suffix}`).join(' '),
	}
}

export const getDeclaration = (property, value/* , decl */) => {
	// decl = decl || parseDeclaration(property, value)
	const parsedDecl = parseDeclaration(property, value)
	const declParts = getDeclarationParts(parsedDecl)
	return `${declParts.property}:${declParts.value};`
}

export const getIntervalKeyframe = (property, interval, locus) => {
	const { start, stop, keyframes } = interval
	const duration = stop - start
	const startValue = keyframes[0][property]
	const stopValue = keyframes[1][property]
	const startDecl = parseDeclaration(property, startValue)
	const stopDecl = parseDeclaration(property, stopValue)

	// NOTE: mutating startDecl and passing it BACK as the interpolated declaration
	startDecl.segments = startDecl.segments.map((segment, index) => {
		// (locus / duration * (stopValue - startValue)) + startValue
		segment.value = (locus / duration * (stopDecl.segments[index].value - segment.value)) + segment.value
		return segment
	})
	const decl = {}
	const declParts = getDeclarationParts(startDecl)
	return decl[declParts.property] = declParts.value
}
