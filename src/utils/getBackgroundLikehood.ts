import {PixelNode} from './classes/pixelNode'

export function getBackgroundLikehood(
	pixelNode: PixelNode,
	backgroundColors: string[]
) {
	let maxBackgroundLikehood = 0

	backgroundColors.forEach(color => {
		const redValue = Number('0x' + color.substring(0, 2))
		const greenValue = Number('0x' + color.substring(2, 4))
		const blueValue = Number('0x' + color.substring(4, 6))

		const redDifference = Math.abs(pixelNode.rgba.red - redValue)
		const greenDifference = Math.abs(pixelNode.rgba.green - greenValue)
		const blueDifference = Math.abs(pixelNode.rgba.blue - blueValue)
		const averageDifference =
			(redDifference + greenDifference + blueDifference) / 3

		const backgroundLikehood = (255 - averageDifference) / 255
		if (backgroundLikehood > maxBackgroundLikehood)
			maxBackgroundLikehood = backgroundLikehood
	})

	return maxBackgroundLikehood
}
