import { TargetValues } from '../../components/_map/_filters/_selectors/ServiceTargetSelector'
import { FiltersDispatchTypes, SET_TARGET_FILTER } from '../types/filtersTypes'

// Types of initial state
interface InitialState {
	target: TargetValues
}

// Initial state
const INITIAL_STATE: InitialState = {
	target: 'Photographer',
}

export const filtersReducer = (
	state: InitialState = INITIAL_STATE,
	action: FiltersDispatchTypes
): InitialState => {
	switch (action.type) {
		case SET_TARGET_FILTER:
			return { ...state, target: action.payload }
		default:
			return state
	}
}
