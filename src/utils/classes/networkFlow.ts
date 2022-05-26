import {Edge} from './edge'
import {PixelNode} from './pixelNode'
import {getSeparationPenalty} from '../getSeparationPenalty'

const sourceNode: PixelNode = new PixelNode(0, 0, 0, 0, 0, 0)
const sinkNode: PixelNode = new PixelNode(0, 0, 0, 0, 0, 0)

export class NetworkFlow {
	nodes: PixelNode[][] = []

	width = 0
	height = 0

	constructor(image: ImageData) {
		this.width = image.width
		this.height = image.height

		// create nodes
		for (let row = 0; row < this.height; row++) {
			const rowNodes: PixelNode[] = []

			for (let column = 0; column < this.width; column++) {
				const pixelBaseIndex = row * this.height + column

				const redValue = image.data[pixelBaseIndex + 0]
				const greenValue = image.data[pixelBaseIndex + 1]
				const blueValue = image.data[pixelBaseIndex + 2]
				const alphaValue = image.data[pixelBaseIndex + 3]

				const pixelNode = new PixelNode(
					redValue,
					greenValue,
					blueValue,
					alphaValue,
					row,
					column
				)

				rowNodes.push(pixelNode)
			}

			this.nodes.push(rowNodes)
		}

		this.computeEdges()
	}

	computeEdges() {
		sourceNode.edges.length = 0 // clear previous source edges
		sinkNode.edges.length = 0 // clear previous sink edges

		// set up edges
		for (let row = 0; row < this.height; row++) {
			for (let column = 0; column < this.width; column++) {
				const pixelNode = this.nodes[row][column]
				pixelNode.edges.length = 0 // clear previous node edges

				// top pixel
				if (row > 0) {
					const topNode = this.nodes[row - 1][column]
					const penalty = getSeparationPenalty(pixelNode, topNode)
					pixelNode.edges.push(new Edge(pixelNode, topNode, penalty))
				}

				// bottom pixel
				if (row < this.height - 1) {
					const bottomNode = this.nodes[row + 1][column]
					const penalty = getSeparationPenalty(pixelNode, bottomNode)
					pixelNode.edges.push(new Edge(pixelNode, bottomNode, penalty))
				}

				// left pixel
				if (column > 0) {
					const leftNode = this.nodes[row][column - 1]
					const penalty = getSeparationPenalty(pixelNode, leftNode)
					pixelNode.edges.push(new Edge(pixelNode, leftNode, penalty))
				}

				// right pixel
				if (column < this.width - 1) {
					const rightNode = this.nodes[row][column + 1]
					const penalty = getSeparationPenalty(pixelNode, rightNode)
					pixelNode.edges.push(new Edge(pixelNode, rightNode, penalty))
				}

				// source
				sourceNode.edges.push(
					new Edge(sourceNode, pixelNode, pixelNode.foregroundLikehood)
				)

				// sink
				sinkNode.edges.push(
					new Edge(pixelNode, sinkNode, pixelNode.backgroundLikehood)
				)
			}
		}

		console.log('<< nodes >>', this.nodes)
	}
}
