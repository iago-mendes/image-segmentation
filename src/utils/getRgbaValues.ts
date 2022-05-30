export function getRgbaValues(color: string) {
	if (color[0] == '#') color = color.substring(1)

	const redValue = color.length < 2 ? 0 : Number('0x' + color.substring(0, 2))
	const greenValue = color.length < 4 ? 0 : Number('0x' + color.substring(2, 4))
	const blueValue = color.length < 6 ? 0 : Number('0x' + color.substring(4, 6))
	const alphaValue =
		color.length < 8 ? 255 : Number('0x' + color.substring(6, 8))

	return {redValue, greenValue, blueValue, alphaValue}
}
