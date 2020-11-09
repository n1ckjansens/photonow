import React from 'react'
import { shallow } from 'enzyme'
import ConnectedMap, { Map } from '../../../components/_map/Map'
import configureStore from 'redux-mock-store'
import Marker from '../../../components/_map/_marker/Marker'
import GoogleMapReact from 'google-map-react'

//Function to render component into test
const setUp = (props) => shallow(<Map {...props} />)

//Function to test onClick events working
const fn = jest.fn()

//Initial state for FAKE redux store to test out props
const initialMapState = {
	userLocation: {
		lat: 55.7558,
		lng: 37.6173,
	},
	markers: [
		{
			id: 0,
			location: {
				lat: 55.7558,
				lng: 37.6173,
			},
			showCallout: false,
		},
	],
	hideMarkerCallout: fn,
	showMarkerCallout: fn,
	showModal: fn,
}

//First - testing dumb component for simple rendering
describe('Dumb map component tests', () => {
	let component, map

	//Rendering component before each test
	beforeEach(() => {
		component = setUp(initialMapState)
		//Finding map <GoogleMapReact /> element in component
		map = component.find(GoogleMapReact)
	})

	//Testing for successfull rendering of map through .map__container wrapper
	it('Should contain .map__container wrapper', () => {
		const map__container = component.find('.map__container')
		expect(map__container.length).toBe(1)
	})

	//Testing if marker rendered
	it('Should render one marker', () => {
		expect(component.find(Marker).length).toEqual(1)
	})

	//Testing if marker onClick event works and opens callout
	it('Map onChildClick event should work', () => {
		//Calling onChildClick() method from map props
		map.props().onChildClick(0)
		//Checking if function was called
		expect(fn.mock.calls.length).toBe(1)
	})

	//Testing if map onClick event works and not closing callout when pressing on it
	it('Map onClick event should not close callout when pressing on it', () => {
		//Simulating event type with class name
		const event = { target: { className: 'ihad' } }
		//Calling onClick() method from map props with event prop
		map.props().onClick({ event })
		//Checking if function wasn't called
		expect(fn.mock.calls.length).toBe(0)
	})

	//Testing if map onClick event works and closing callout when pressing on map
	it('Map onClick event should work when pressing not on callout', () => {
		//Simulating event type without class name
		const event = { target: { className: '' } }
		//Calling onClick() method from map props with event prop
		map.props().onClick({ event })
		//Checking if function was called
		expect(fn.mock.calls.length).toBe(1)
	})

	//Testing if modal callout is being called when window width is less that 750px
	it('Map onClick event should call modal callout when window width is less that 750px', () => {
		//setting window width
		window.innerWidth = 600
		//re-rendering co,ponent with new width
		component = setUp(initialMapState)
		//Finding map <GoogleMapReact /> element in component
		map = component.find(GoogleMapReact)
		//Calling onChildClick() method from map props
		map.props().onChildClick(0)
		//Checking if function was called
		expect(fn.mock.calls.length).toBe(1)
	})

	//Testing component matches previos snapshots
	it('Should match snapshot', () => {
		expect(component).toMatchSnapshot()
	})
})

//Testing connected to Redux component for a props match
describe('Connected to Redux map component test', () => {
	let store, component, componentProps
	//creating fake redux store
	const mockStore = configureStore()

	//Rendering component and creating new store from initial props before each test
	beforeEach(() => {
		store = mockStore(initialMapState)
		component = shallow(<ConnectedMap store={store} />)
		componentProps = component.props()
	})

	//Testing for successfull rendering of connected component
	it('Shold render connected commponent', () => {
		expect(component.length).toEqual(1)
	})

	//Checking for userLocation props mathing in redux store and internal props
	it('UserLocation prop should match with store initialState', () => {
		expect(componentProps.children.props.userLocation).toEqual(
			initialMapState.userLocation
		)
	})

	//Checking for Markers props mathing in redux store and internal props
	it('Markers prop should match with store initialState', () => {
		expect(componentProps.children.props.markers).toEqual(
			initialMapState.markers
		)
	})

	//Testing component matches previos snapshots
	it('Connected component should match snapshot', () => {
		expect(component).toMatchSnapshot()
	})
})
