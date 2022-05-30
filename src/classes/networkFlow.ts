import {Edge} from './edge'
import {PixelNode} from './pixelNode'
import {getSeparationPenalty} from '../utils/getSeparationPenalty'
import {getBackgroundLikehood} from '../utils/getBackgroundLikehood'
import {getForegroundLikehood} from '../utils/getForegroundLikehood'
import {AugmentingEdge, AugmentingPath} from '../types/augmentingPath'
import {Flow} from '../types/flow'
import {getMinimumCut} from '../algorithms/minimumCut'

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

		this.sourceNode.foregroundLikehood = 255
		this.sourceNode.backgroundLikehood = 0
		this.sinkNode.foregroundLikehood = 0
		this.sinkNode.backgroundLikehood = 255

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

		const minimumCut = getMinimumCut(this)

		for (let row = 0; row < this.height; row++) {
			for (let column = 0; column < this.width; column++) {
				const pixelNode = this.nodes[row][column]

				// const isBackgroundNode = pixelNode.backgroundLikehood > 200
				const isBackgroundNode = !minimumCut.has(pixelNode)

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

	getAugmentingPath(): AugmentingPath | null {
		const sourceNode = this.sourceNode
		const sinkNode = this.sinkNode

		const exploredNodes = new Set<PixelNode>([sourceNode])

		// backtracking
		function getAugmentingPathFromNodeToSink(
			currentNode: PixelNode,
			currentEdge: AugmentingEdge,
			oldAugmentingPath: AugmentingPath
		): AugmentingPath | null {
			const currentValue = currentEdge.isForward
				? currentEdge.edge.forwardResidualValue
				: currentEdge.edge.backwardResidualValue

			const isPathFeasible =
				currentValue > 0 && !oldAugmentingPath.path.includes(currentEdge)
			if (!isPathFeasible) return null

			const currentAugmentingPath: AugmentingPath = {
				path: [...oldAugmentingPath.path, currentEdge],
				value: Math.min(oldAugmentingPath.value, currentValue)
			}

			const isPathComplete = currentNode == sinkNode
			if (isPathComplete) return currentAugmentingPath

			// forward edges
			for (const newEdge of currentNode.forwardEdges) {
				const newNode = newEdge.destinationNode
				if (exploredNodes.has(newNode)) continue
				else exploredNodes.add(newNode)

				const newAugmentingPath = getAugmentingPathFromNodeToSink(
					newNode,
					{edge: newEdge, isForward: true},
					currentAugmentingPath
				)
				if (newAugmentingPath != null) return newAugmentingPath
			}

			// backward edges
			for (const newEdge of currentNode.backwardEdges) {
				const newNode = newEdge.originNode
				if (exploredNodes.has(newNode)) continue
				else exploredNodes.add(newNode)

				const newAugmentingPath = getAugmentingPathFromNodeToSink(
					newNode,
					{edge: newEdge, isForward: false},
					currentAugmentingPath
				)
				if (newAugmentingPath != null) return newAugmentingPath
			}

			return null
		}

		const initialAugmentingPath: AugmentingPath = {path: [], value: Infinity}

		for (const newEdge of this.sourceNode.forwardEdges) {
			const newNode = newEdge.destinationNode

			const newAugmentingPath = getAugmentingPathFromNodeToSink(
				newNode,
				{edge: newEdge, isForward: true},
				initialAugmentingPath
			)
			if (newAugmentingPath != null) return newAugmentingPath
		}

		return null
	}

	updateResidualGraph(flow: Flow) {
		this.edges.forEach(edge => {
			const flowValue = flow.get(edge)
			if (flowValue == undefined) return

			edge.forwardResidualValue = edge.capacity - flowValue
			edge.backwardResidualValue = flowValue
		})
	}
}
