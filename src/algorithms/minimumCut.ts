import {Edge} from '../classes/edge'
import {NetworkFlow} from '../classes/networkFlow'
import {Flow} from '../types/flow'

// Ford-Fulkerson algorithm
export function getMinimumCut(networkFlow: NetworkFlow) {
	const maximumFlow: Flow = new Map<Edge, number>()
	networkFlow.edges.forEach(edge => maximumFlow.set(edge, 0))

	networkFlow.resetResidualGraph()

	let augmentingPath = networkFlow.getAugmentingPath()

	while (augmentingPath != null) {
		const augmentingValue = augmentingPath.value
		augmentingPath.path.forEach(({edge, isForward}) => {
			const currentFlowValue = maximumFlow.get(edge)
			if (!currentFlowValue) return

			const flowChange = isForward ? augmentingValue : -1 * augmentingValue
			const newFlowValue = currentFlowValue + flowChange

			maximumFlow.set(edge, newFlowValue)
		})

		networkFlow.updateResidualGraph(maximumFlow)

		augmentingPath = networkFlow.getAugmentingPath()
	}

	// get minimum cut
}
