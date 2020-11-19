import { TargetValues } from '../../components/_map/_filters/_selectors/ServiceTargetSelector'

export const SET_TARGET_FILTER = 'FILTERS/SET_TARGET_FILTER'

export interface SetTargetFilter {
	type: typeof SET_TARGET_FILTER
	payload: TargetValues
}

export type FiltersDispatchTypes = SetTargetFilter
