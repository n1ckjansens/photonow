import {
	GET_USER_LOCATION,
	UserLocationDispatchTypes,
} from '../types/userLocationTypes'

interface userLocationDefaultState {
	lat: number
	lng: number
}

const initialState: userLocationDefaultState = {
	lat: 55.7558,
	lng: 37.6173,
}

export const userLocationReducer = (
	state: userLocationDefaultState = initialState,
	action: UserLocationDispatchTypes
): userLocationDefaultState => {
	switch (action.type) {
		case GET_USER_LOCATION:
			return { ...action.payload }
		default:
			return state
	}
}
