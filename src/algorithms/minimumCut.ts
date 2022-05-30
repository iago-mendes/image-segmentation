import {Edge} from '../classes/edge'
import {NetworkFlow} from '../classes/networkFlow'
import {Flow} from '../types/flow'

// Ford-Fulkerson algorithm
export function getMinimumCut(networkFlow: NetworkFlow) {
	const maximumFlow: Flow = new Map<Edge, number>()
	networkFlow.edges.forEach(edge => maximumFlow.set(edge, 0))

	networkFlow.resetResidualGraph()

	while (networkFlow.hasAugmentingPath()) {
		const augmentingPath = networkFlow.getAugmentingPath()

		// augmentPath

		networkFlow.updateResidualGraph(maximumFlow)
	}

	// get minimum cut
}
