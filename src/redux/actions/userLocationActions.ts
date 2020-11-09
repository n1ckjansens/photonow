import { Dispatch } from 'redux'
import {
	GET_USER_LOCATION,
	UserLocationDispatchTypes,
} from '../types/userLocationTypes'

export function getUserLocation() {
	return async (dispatch: Dispatch<UserLocationDispatchTypes>) => {
		//Getting user location by requesting https://geolocation-db.com/json/
		const response = await fetch('https://geolocation-db.com/json/')

		//parsing response to json format
		const json = await response.json()

		//making object with data from response
		const location = {
			lat: json.latitude,
			lng: json.longitude,
		}

		// Setting user location to App state
		dispatch({ type: GET_USER_LOCATION, payload: location })
	}
}
