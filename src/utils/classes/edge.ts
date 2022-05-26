import {PixelNode} from './pixelNode'

export class Edge {
	originNode: PixelNode
	destinationNode: PixelNode

	weight: number

	constructor(
		originNode: PixelNode,
		destinationNode: PixelNode,
		weight: number
	) {
		this.originNode = originNode
		this.destinationNode = destinationNode
		this.weight = weight
	}
}
