import {PixelNode} from './classes/pixelNode'

export function getSeparationPenalty(
	pixelNodeA: PixelNode,
	pixelNodeB: PixelNode
) {
	const penalty1 = Math.abs(
		pixelNodeA.foregroundLikehood - pixelNodeB.backgroundLikehood
	)
	const penalty2 = Math.abs(
		pixelNodeA.backgroundLikehood - pixelNodeB.foregroundLikehood
	)

	const penaltyAverage = (penalty1 + penalty2) / 2

	return penaltyAverage
}
