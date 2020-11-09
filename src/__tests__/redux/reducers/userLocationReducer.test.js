import { userLocationReducer } from '../../../redux/reducers/userLocationReducer'
import { GET_USER_LOCATION } from '../../../redux/types/userLocationTypes'

describe('User location reducer test', () => {
	//Testing that reducer returns initial state
	it('Should return initial state', () => {
		expect(userLocationReducer(undefined, {})).toEqual({
			lat: 55.7558,
			lng: 37.6173,
		})
	})
	//Testing that reducer correctly working with GET_USER_LOCATION event
	it('Should handle GET_USER_LOCATION', () => {
		expect(
			userLocationReducer(
				{},
				{
					type: GET_USER_LOCATION,
					payload: {
						lat: 1234,
						lng: 1234,
					},
				}
			)
		).toEqual({
			lat: 1234,
			lng: 1234,
		})
		expect(
			userLocationReducer(
				{},
				{
					type: GET_USER_LOCATION,
					payload: {
						lat: 4321,
						lng: 4321,
					},
				}
			)
		).toEqual({
			lat: 4321,
			lng: 4321,
		})
	})
})
