import React from 'react'
import { shallow } from 'enzyme'
import MarkerCalloutLayout from '../../../../../components/_map/_marker/_marker_callout/MarkerCalloutLayout'

//Function to render component into test
const setUp = (props) => shallow(<MarkerCalloutLayout {...props} />)

describe('Marker callout popup component test', () => {
	let component,
		componentToTestButtons,
		buttonLeft,
		buttonRight,
		slider,
		fn,
		useEffect

	//Function to fake React.useEffect event
	const mockUseEffect = () => {
		useEffect.mockImplementationOnce((f) => f())
	}

	//Rendering component before each test
	beforeEach(() => {
		//Function to test onClick events working
		fn = jest.fn()
		//Rendering component to test ONLY proper rendering
		component = setUp()
		//This rendered component contains custom slider prop to test onClick events
		componentToTestButtons = setUp({ testSlider: { scroll: fn } })
		//Left slider button component
		buttonLeft = componentToTestButtons.find('#toggle__previous__button')
		//Right slider button component
		buttonRight = componentToTestButtons.find('#toggle__next__button')
		//Slider component
		slider = component.find('.portfolio__items')
		//Facking React.useEffect event
		useEffect = jest.spyOn(React, 'useEffect')
		mockUseEffect()
	})

	//Testing for successfull rendering of callout through .callout__container  wrapper
	it('Should render successfully and contain .user__credentials wrapper', () => {
		const user__credentials = component.find('.user__credentials')
		expect(user__credentials.length).toBe(1)
	})

	//Testing that callout contains slider component
	it('Should contain slider component', () => {
		expect(slider.length).toBe(1)
	})

	//Testing that onClick function called when pressing right button
	it('Slider right button should work', () => {
		buttonRight.simulate('click')
		expect(fn.mock.calls.length).toBe(1)
	})

	//Testing that onClick function called when pressing left button
	it('Slider left button should work', () => {
		buttonLeft.simulate('click')
		expect(fn.mock.calls.length).toBe(1)
	})

	//Testing component matches previos snapshots
	it('Should match snapshot', () => {
		expect(component).toMatchSnapshot()
	})
})
