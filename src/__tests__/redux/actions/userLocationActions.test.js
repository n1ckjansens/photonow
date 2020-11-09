import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { getUserLocation } from '../../../redux/actions/userLocationActions'
import { GET_USER_LOCATION } from '../../../redux/types/userLocationTypes'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('Redux getUserLocationActions test', () => {
	let store, initialState

	beforeEach(() => {
		//cofiguring initial state for store
		initialState = { userLocation: {} }
		//Configuring fake redux store
		store = mockStore(initialState)
	})

	//Clearing fake server response after each test
	afterEach(() => {
		fetchMock.restore()
	})

	//Testing that action dispatches correct location
	it('Creates GET_USER_LOCATION dispatch action correctly when location is recieved', () => {
		//Simulating server response
		fetchMock.getOnce('https://geolocation-db.com/json/', {
			body: { latitude: 55.7558, longitude: 37.6173 },
			headers: { 'content-type': 'application/json' },
		})

		//Expecting this type of dispatch
		const expectedActions = [
			{
				type: GET_USER_LOCATION,
				payload: {
					lat: 55.7558,
					lng: 37.6173,
				},
			},
		]

		//Testing
		return store.dispatch(getUserLocation()).then(() => {
			//Checking if it dispatches right
			expect(store.getActions()).toEqual(expectedActions)
		})
	})
})
