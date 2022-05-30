import {PixelNode} from './pixelNode'

export class Edge {
	originNode: PixelNode
	destinationNode: PixelNode

	capacity: number

	forwardResidualValue: number
	backwardResidualValue: number

	constructor(
		originNode: PixelNode,
		destinationNode: PixelNode,
		capacity: number
	) {
		this.originNode = originNode
		this.destinationNode = destinationNode
		this.capacity = capacity

		this.forwardResidualValue = capacity
		this.backwardResidualValue = 0
	}
}
