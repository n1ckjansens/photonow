import React from 'react'
import { shallow } from 'enzyme'
import Marker from '../../../../components/_map/_marker/Marker'
import MarkerCalloutPopup from '../../../../components/_map/_marker/_marker_callout/MarkerCalloutPopup'

//Function to render component into test
const setUp = (props) => shallow(<Marker {...props} />)

describe('Marker component test', () => {
	let component, componentWithoutCallout

	//Rendering component before each test
	beforeEach(() => {
		componentWithoutCallout = setUp({ showCallout: false })
		component = setUp({ showCallout: true })
	})

	//Testing for successfull rendering of map through .map__container wrapper
	it('Should render successfully and contain .marker__container wrapper', () => {
		const marker__container = component.find('.marker__container')
		expect(marker__container.length).toBe(1)
	})

	//Testing that callout doesn't shows when showCallout prop is false
	it('Should non contain callout component when showCallout prop is false', () => {
		const callout = componentWithoutCallout.find(MarkerCalloutPopup)
		expect(callout.length).toBe(0)
	})

	//Testing if calloutPopup shows when showCallout prop is true and window.innerWidth prop is grater than 750px
	it('Should contain MarkerCalloutPopup component when showCallout prop is true and window.innerWidth prop is grater than 750px', () => {
		//setting window width
		window.innerWidth = 800
		//rendering component od this width
		const coponentWithCallout = setUp({ showCallout: true })
		//finding callout component
		const callout = coponentWithCallout.find(MarkerCalloutPopup)
		expect(callout.length).toBe(1)
	})

	//Testing component matches previos snapshots
	it('Should match snapshot', () => {
		expect(component).toMatchSnapshot()
	})
})
