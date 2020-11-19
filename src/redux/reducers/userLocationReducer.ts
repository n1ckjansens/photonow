import {
	GET_USER_LOCATION,
	UserLocationDispatchTypes,
} from '../types/userLocationTypes'

// Types of initial state
export interface LocationState {
	coords: {
		lat: number
		lng: number
	}
	city: string
}

// Initial state
const INITIAL_STATE: LocationState = {
	coords: {
		lat: 55.7558,
		lng: 37.6173,
	},
	city: 'Москва',
}

export const userLocationReducer = (
	state: LocationState = INITIAL_STATE,
	action: UserLocationDispatchTypes
): LocationState => {
	switch (action.type) {
		case GET_USER_LOCATION:
			return { ...action.payload }
		default:
			return state
	}
}
