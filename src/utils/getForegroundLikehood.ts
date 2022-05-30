import {PixelNode} from '../classes/pixelNode'
import {getBackgroundLikehood} from './getBackgroundLikehood'

export function getForegroundLikehood(
	pixelNode: PixelNode,
	backgroundColors: string[]
) {
	const backgroundLikehood = getBackgroundLikehood(pixelNode, backgroundColors)
	const foregroundLikehood = 255 - backgroundLikehood

	return foregroundLikehood
}
