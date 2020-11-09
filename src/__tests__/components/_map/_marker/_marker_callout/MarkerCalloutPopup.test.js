import React from 'react'
import { shallow } from 'enzyme'
import MarkerCalloutPopup from '../../../../../components/_map/_marker/_marker_callout/MarkerCalloutPopup'
import MarkerCalloutLayout from '../../../../../components/_map/_marker/_marker_callout/MarkerCalloutLayout'

//Function to render component into test
const setUp = (props) => shallow(<MarkerCalloutPopup {...props} />)

describe('Marker callout popup component test', () => {
	let component

	//Rendering component before each test
	beforeEach(() => {
		//Rendering component to test proper rendering
		component = setUp()
	})

	//Testing for successfull rendering of callout through .callout__container  wrapper
	it('Should render successfully and contain .callout__container wrapper', () => {
		const callout__container = component.find('.callout__container')
		expect(callout__container.length).toBe(1)
	})

	//Testing that component contains <MarkerCalloutLayout /> element inside
	it('Should contain <MarkerCalloutLayout /> element', () => {
		const markerCalloutLayout = component.find(MarkerCalloutLayout)
		expect(markerCalloutLayout.length).toBe(1)
	})

	//Testing component matches previos snapshots
	it('Should match snapshot', () => {
		expect(component).toMatchSnapshot()
	})
})
