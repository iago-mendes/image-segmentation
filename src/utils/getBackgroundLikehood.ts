import {PixelNode} from '../classes/pixelNode'
import {getRgbaValues} from './getRgbaValues'

export function getBackgroundLikehood(
	pixelNode: PixelNode,
	backgroundColors: string[]
) {
	let maxBackgroundLikehood = 0

	backgroundColors.forEach(color => {
		const {redValue, greenValue, blueValue} = getRgbaValues(color)

		const redDifference = Math.abs(pixelNode.rgba.red - redValue)
		const greenDifference = Math.abs(pixelNode.rgba.green - greenValue)
		const blueDifference = Math.abs(pixelNode.rgba.blue - blueValue)
		const averageDifference = Math.round(
			(redDifference + greenDifference + blueDifference) / 3
			// (redDifference * greenDifference * blueDifference) ** (1 / 3)
		)

		const backgroundLikehood = Math.abs(255 - averageDifference)
		if (backgroundLikehood > maxBackgroundLikehood)
			maxBackgroundLikehood = backgroundLikehood
	})

	return maxBackgroundLikehood
}
