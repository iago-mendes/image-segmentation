import {PixelNode} from './pixelNode'

export class Edge {
	originNode: PixelNode
	destinationNode: PixelNode

	constructor(originNode: PixelNode, destinationNode: PixelNode) {
		this.originNode = originNode
		this.destinationNode = destinationNode
	}
}
