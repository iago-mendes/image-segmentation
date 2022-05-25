import {Edge} from './edge'

type Rgba = {
	red: number
	green: number
	blue: number
	alpha: number
}

export class PixelNode {
	rgba: Rgba
	xPosition: number
	yPosition: number

	foregroundLikehood = 0
	backgroundLikehood = 0

	edges: Edge[] = []

	constructor(
		red: number,
		green: number,
		blue: number,
		alpha: number,
		x: number,
		y: number
	) {
		this.rgba = {
			red,
			green,
			blue,
			alpha
		}
		this.xPosition = x
		this.yPosition = y
	}
}
