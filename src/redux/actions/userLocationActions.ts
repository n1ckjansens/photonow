import { Dispatch } from 'redux'
import { LocationState } from '../reducers/userLocationReducer'
import {
	GET_USER_LOCATION,
	UserLocationDispatchTypes,
} from '../types/userLocationTypes'

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
	const city = await getUserCity(coords)

	//making object of location
	const location: LocationState = {
		coords: { ...coords },
		city,
	}

	// Setting user location to App state
	dispatch({ type: GET_USER_LOCATION, payload: location })
}

//Function to get user City
const getUserCity = async (coords: Coords): Promise<string> => {
	//Getting Yandex Api key from .env file
	const API_KEY = process.env.YANDEX_GEOCODE_API_KEY

	//Getting user city by requesting https://geocode-maps.yandex.ru
	const response = await fetch(
		`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${coords.lat},${coords.lng}&kind=locality&results=1`
	)

	//parsing response to json format
	const json = await response.json()

	//making object with city from response
	return json.response.GeoObjectCollection.featureMember[0].GeoObject.name
}

export function getUserLocation() {
	return async (dispatch: Dispatch<UserLocationDispatchTypes>) => {
		//Getting user position and dispatching it
		navigator.geolocation.getCurrentPosition((position) =>
			success(position, dispatch)
		)
	}
}

//TODO: Make Geolocation error callback with custom alerts
