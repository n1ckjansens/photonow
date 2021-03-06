import { TargetValues } from '../../components/_map/_filters/_selectors/ServiceTargetSelector'
import { SetTargetFilter, SET_TARGET_FILTER } from '../types/filtersTypes'

// Function to change Target Filters
export function setTargetFilter(type: TargetValues): SetTargetFilter {
	return { type: SET_TARGET_FILTER, payload: type }
}
