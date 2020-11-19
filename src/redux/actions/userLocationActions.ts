import { Dispatch } from 'redux'
import { LocationState } from '../reducers/userLocationReducer'
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

		//making object with coords from response
		const coords = {
			lat: json.latitude,
			lng: json.longitude,
		}

		//TODO: Fetch city from Yandex Geocords API

		//making object of location
		const location: LocationState = {
			coords: { ...coords },
			city: 'Moscow',
		}

		// Setting user location to App state
		dispatch({ type: GET_USER_LOCATION, payload: location })
	}
}
