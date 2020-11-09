export const GET_USER_LOCATION = 'LOCATION/GET_USER_LOCATION'

export interface GetUserLocation {
	type: typeof GET_USER_LOCATION
	payload: {
		lat: number
		lng: number
	}
}

export type UserLocationDispatchTypes = GetUserLocation
