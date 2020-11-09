import { GET_USER_LOCATION } from '../types/userLocationTypes'

export function getUserLocation() {
	return {
		type: GET_USER_LOCATION,
	}
}
