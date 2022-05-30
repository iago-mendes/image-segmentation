import {Edge} from './edge'
import {PixelNode} from './pixelNode'
import {getSeparationPenalty} from '../utils/getSeparationPenalty'
import {getBackgroundLikehood} from '../utils/getBackgroundLikehood'
import {getForegroundLikehood} from '../utils/getForegroundLikehood'
import {AugmentingPath} from '../types/augmentingPath'
import {Flow} from '../types/flow'

export class NetworkFlow {
	nodes: PixelNode[][] = []
	edges: Edge[] = []

	sourceNode: PixelNode = new PixelNode(0, 0, 0, 0, -1, -1)
	sinkNode: PixelNode = new PixelNode(0, 0, 0, 0, -1, -1)

	width = 0
	height = 0

	originalImage: ImageData | null = null

	computeNodes(image: ImageData) {
		this.originalImage = image

		this.width = image.width
		this.height = image.height

		// create nodes
		for (let row = 0; row < this.height; row++) {
			const rowNodes: PixelNode[] = []

			for (let column = 0; column < this.width; column++) {
				const pixelBaseIndex = (row * this.width + column) * 4

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

		console.log('<< nodes >>', this.nodes)
	}

	computeEdges(backgroundColors: string[]) {
		// clear previous edges
		this.edges.length = 0
		this.sourceNode.forwardEdges.length = 0
		this.sourceNode.backwardEdges.length = 0
		this.sinkNode.forwardEdges.length = 0
		this.sinkNode.backwardEdges.length = 0

		// compute foreground and background likehoods
		for (let row = 0; row < this.height; row++) {
			for (let column = 0; column < this.width; column++) {
				const pixelNode = this.nodes[row][column]

				pixelNode.backgroundLikehood = getBackgroundLikehood(
					pixelNode,
					backgroundColors
				)

				pixelNode.foregroundLikehood = getForegroundLikehood(
					pixelNode,
					backgroundColors
				)
			}
		}

		this.sourceNode.foregroundLikehood = 1
		this.sourceNode.backgroundLikehood = 0
		this.sinkNode.foregroundLikehood = 0
		this.sinkNode.backgroundLikehood = 1

		// set up edges
		for (let row = 0; row < this.height; row++) {
			for (let column = 0; column < this.width; column++) {
				const pixelNode = this.nodes[row][column]

				// clear previous node edges
				pixelNode.forwardEdges.length = 0
				pixelNode.backwardEdges.length = 0

				// top pixel
				if (row > 0) {
					const topNode = this.nodes[row - 1][column]
					const penalty = getSeparationPenalty(pixelNode, topNode)
					const topEdge = new Edge(pixelNode, topNode, penalty)
					pixelNode.forwardEdges.push(topEdge)
					topNode.backwardEdges.push(topEdge)
					this.edges.push(topEdge)
				}

				// bottom pixel
				if (row < this.height - 1) {
					const bottomNode = this.nodes[row + 1][column]
					const penalty = getSeparationPenalty(pixelNode, bottomNode)
					const bottomEdge = new Edge(pixelNode, bottomNode, penalty)
					pixelNode.forwardEdges.push(bottomEdge)
					bottomNode.backwardEdges.push(bottomEdge)
					this.edges.push(bottomEdge)
				}

				// left pixel
				if (column > 0) {
					const leftNode = this.nodes[row][column - 1]
					const penalty = getSeparationPenalty(pixelNode, leftNode)
					const leftEdge = new Edge(pixelNode, leftNode, penalty)
					pixelNode.forwardEdges.push(leftEdge)
					leftNode.backwardEdges.push(leftEdge)
					this.edges.push(leftEdge)
				}

				// right pixel
				if (column < this.width - 1) {
					const rightNode = this.nodes[row][column + 1]
					const penalty = getSeparationPenalty(pixelNode, rightNode)
					const rightEdge = new Edge(pixelNode, rightNode, penalty)
					pixelNode.forwardEdges.push(rightEdge)
					rightNode.backwardEdges.push(rightEdge)
					this.edges.push(rightEdge)
				}

				// source
				const sourceEdge = new Edge(
					this.sourceNode,
					pixelNode,
					pixelNode.foregroundLikehood
				)
				this.sourceNode.forwardEdges.push(sourceEdge)
				pixelNode.backwardEdges.push(sourceEdge)
				this.edges.push(sourceEdge)

				// sink
				const sinkEdge = new Edge(
					pixelNode,
					this.sinkNode,
					pixelNode.backgroundLikehood
				)
				pixelNode.forwardEdges.push(sinkEdge)
				this.sinkNode.backwardEdges.push(sinkEdge)
				this.edges.push(sinkEdge)
			}
		}
	}

	separateForegroundAndBackground(backgroundColors: string[]) {
		this.computeEdges(backgroundColors)

		const foregroundNodes: PixelNode[] = []
		const backgroundNodes: PixelNode[] = []

		for (let row = 0; row < this.height; row++) {
			for (let column = 0; column < this.width; column++) {
				const pixelNode = this.nodes[row][column]

				const isBackgroundNode = pixelNode.backgroundLikehood > 0.75

				if (isBackgroundNode) backgroundNodes.push(pixelNode)
				else foregroundNodes.push(pixelNode)
			}
		}

		return {foregroundNodes, backgroundNodes}
	}

	getImage(exclusionList: PixelNode[] = []) {
		const image = new ImageData(this.width, this.height)

		for (let row = 0; row < this.height; row++) {
			for (let column = 0; column < this.width; column++) {
				const pixelNode = this.nodes[row][column]
				const isIncluded = !exclusionList.includes(pixelNode)

				const pixelBaseIndex = (row * this.width + column) * 4

				image.data[pixelBaseIndex] = pixelNode.rgba.red
				image.data[pixelBaseIndex + 1] = pixelNode.rgba.green
				image.data[pixelBaseIndex + 2] = pixelNode.rgba.blue
				image.data[pixelBaseIndex + 3] = isIncluded ? pixelNode.rgba.alpha : 0
			}
		}

		return image
	}

	resetResidualGraph() {
		this.edges.forEach(edge => {
			edge.backwardResidualValue = 0
			edge.forwardResidualValue = edge.capacity
		})
	}

	hasAugmentingPath(): boolean {
		// NEED TO IMPLEMENT
		return false
	}

	getAugmentingPath(): AugmentingPath {
		// NEED TO IMPLEMENT
		return {path: [], value: 0}
	}

	updateResidualGraph(flow: Flow) {
		// NEED TO IMPLEMENT
	}
}
