import {
	GET_USER_LOCATION,
	UserLocationDispatchTypes,
} from '../types/userLocationTypes'

interface userLocationDefaultState {
	lat: number
	lng: number
}

const initialState: userLocationDefaultState = {
	lat: 44.6,
	lng: 33.5,
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
