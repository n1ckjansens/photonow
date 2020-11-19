import { LocationState } from '../reducers/userLocationReducer'

export const GET_USER_LOCATION = 'LOCATION/GET_USER_LOCATION'

export interface GetUserLocation {
	type: typeof GET_USER_LOCATION
	payload: LocationState
}

export type UserLocationDispatchTypes = GetUserLocation
