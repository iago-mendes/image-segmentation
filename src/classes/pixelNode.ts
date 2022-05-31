import {Edge} from './edge'

type Rgba = {
	red: number
	green: number
	blue: number
	alpha: number
}

export class PixelNode {
	rgba: Rgba
	id: string // for debugging purposes

	foregroundLikehood = 0
	backgroundLikehood = 0

	forwardEdges: Edge[] = []
	backwardEdges: Edge[] = []

	constructor(
		red: number,
		green: number,
		blue: number,
		alpha: number,
		id: string
	) {
		this.rgba = {
			red,
			green,
			blue,
			alpha
		}
		this.id = id
	}
}
