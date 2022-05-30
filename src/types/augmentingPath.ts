import {Edge} from '../classes/edge'

type AugmentingEdge = {
	edge: Edge
	isForward: boolean
}

export type AugmentingPath = {
	path: AugmentingEdge[]
	value: number
}
