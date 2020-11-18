import {
	GET_USER_LOCATION,
	UserLocationDispatchTypes,
} from '../types/userLocationTypes'

//Types of initial state
interface InitialState {
	lat: number
	lng: number
}

//initial state
const INITIAL_STATE: InitialState = {
	lat: 55.7558,
	lng: 37.6173,
}

export const userLocationReducer = (
	state: InitialState = INITIAL_STATE,
	action: UserLocationDispatchTypes
): InitialState => {
	switch (action.type) {
		case GET_USER_LOCATION:
			return { ...action.payload }
		default:
			return state
	}
}
