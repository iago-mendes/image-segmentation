import {Edge} from '../classes/edge'
import {NetworkFlow} from '../classes/networkFlow'
import {PixelNode} from '../classes/pixelNode'
import {Flow} from '../types/flow'

// Ford-Fulkerson algorithm
export function getMinimumCut(networkFlow: NetworkFlow) {
	const maximumFlow: Flow = new Map<Edge, number>()
	networkFlow.edges.forEach(edge => maximumFlow.set(edge, 0))

	networkFlow.resetResidualGraph()

	let augmentingPath = networkFlow.getAugmentingPath()

	let i = 0
	while (augmentingPath != null) {
		if (++i > 1000) break
		const augmentingValue = augmentingPath.value
		augmentingPath.path.forEach(({edge, isForward}) => {
			const currentFlowValue = maximumFlow.get(edge)
			if (currentFlowValue == undefined) return

			const flowChange = isForward ? augmentingValue : -1 * augmentingValue
			const newFlowValue = currentFlowValue + flowChange

			maximumFlow.set(edge, newFlowValue)
		})

		networkFlow.updateResidualGraph(maximumFlow)

		augmentingPath = networkFlow.getAugmentingPath()
	}

	const minimumCut: Set<PixelNode> = new Set<PixelNode>([
		networkFlow.sourceNode
	])

	function findReachableNodes(currentNode: PixelNode) {
		currentNode.forwardEdges.forEach(edge => {
			if (edge.forwardResidualValue <= 0) return

			const newNode = edge.destinationNode
			if (minimumCut.has(newNode)) return

			minimumCut.add(newNode)
			findReachableNodes(newNode)
		})

		currentNode.backwardEdges.forEach(edge => {
			if (edge.backwardResidualValue <= 0) return

			const newNode = edge.originNode
			if (minimumCut.has(newNode)) return

			minimumCut.add(newNode)
			findReachableNodes(newNode)
		})
	}

	findReachableNodes(networkFlow.sourceNode)

	return minimumCut
}
