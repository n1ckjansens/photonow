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

//Requesting city data from Yandex API
const fetchCityFromYandex = async (coords: Coords): Promise<string | null> => {
	//Getting Yandex Api key from .env file
	const API_KEY = process.env.YANDEX_GEOCODE_API_KEY

	//Getting user city by requesting https://geocode-maps.yandex.ru
	const result = await request<any>(
		`https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY}&format=json&geocode=${coords.lat},${coords.lng}&kind=locality&results=1`
	)

	//Checking if we found city
	const isCityFound =
		result.parsedBody.response.GeoObjectCollection.metaDataProperty
			.GeocoderResponseMetaData.found

	//If city found - returning it
	return +isCityFound
		? result.parsedBody.response.GeoObjectCollection.featureMember[0].GeoObject
				.name
		: null
}

//Requesting city data from Google API
const fetchCityFromGoogle = async (coords: Coords): Promise<string | null> => {
	//Getting Google Api key from .env file
	const API_KEY = process.env.GOOGLE_API_KEY

	//Getting user city by requesting https://maps.googleapis.com/maps/api/geocode
	const result = await request<any>(
		`https://maps.googleapis.com/maps/api/geocode/json?latlng=${coords.lat},${coords.lng}&sensor=true&key=${API_KEY}&result_type=locality&language=ru`
	)

	//Checking if we found city
	const isCityFound = result.parsedBody.results.length

	//If city found - returning it
	return +isCityFound
		? result.parsedBody.results[0].address_components[0].short_name
		: null
}

//Function to get user City
const getUserCity = async (coords: Coords): Promise<string | null> => {
	//Trying to get city from Yandex API if Yandex didn't found city - trying to get city from Google API
	//If both Yandex and Google unable to found city null will be returned
	const city = (await fetchCityFromYandex(coords))
		? await fetchCityFromYandex(coords)
		: await fetchCityFromGoogle(coords)
	return city
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
