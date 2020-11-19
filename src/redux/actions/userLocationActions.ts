import { Dispatch } from 'redux'
import { LocationState } from '../reducers/userLocationReducer'
import {
	GET_USER_LOCATION,
	UserLocationDispatchTypes,
} from '../types/userLocationTypes'
import { request } from '../../utils/request'

interface Coords {
	lat: number
	lng: number
}

//Function to get user location and set it to state
const success = async (
	position: Position,
	dispatch: Dispatch<UserLocationDispatchTypes>
): Promise<void> => {
	//Getting user coords from browser Geolocation API
	const coords: Coords = {
		lat: position.coords.latitude,
		lng: position.coords.longitude,
	}

	//Getting user City
	const foundCity = await getUserCity(coords)

	//If we found valid location with city - dispatching it to state
	if (foundCity) {
		//making object of location
		const location: LocationState = {
			coords: { ...coords },
			city: foundCity,
		}

		// Setting user location to App state if we found valid location
		dispatch({ type: GET_USER_LOCATION, payload: location })
	}
}

//Requesting city data from Google API
const getUserCity = async (coords: Coords): Promise<string | null> => {
	//Getting Google Api key from .env file
	const API_KEY = process.env.GOOGLE_API_KEY

	//Getting user city by requesting https://maps.googleapis.com/maps/api/geocode
	const result = await request<any>(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&sensor=true&key=${API_KEY}&result_type=locality&language=ru`
	)

	//Checking if we found city
	const isCityFound = result.parsedBody.results.length

	//If city found - returning it
	return isCityFound
		? result.parsedBody.results[0].address_components[0].short_name
		: null
}

export function getUserLocation() {
	return async (dispatch: Dispatch<UserLocationDispatchTypes>) => {
		//Getting user position and dispatching it
		navigator.geolocation.getCurrentPosition(
			async (position) => await success(position, dispatch)
		)
	}
}

//TODO:
// -Make check for browser support of Geolocation API
// -Make Geolocation error callback with custom alerts
