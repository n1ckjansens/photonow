import React from 'react'
import { shallow } from 'enzyme'
import Logo from '../../../components/_global/Logo'

//Function to render component into test
const setUp = (props) => shallow(<Logo {...props} />)

describe('Header component tests', () => {
	let logo

	beforeEach(() => {
		logo = setUp()
	})

	it('Should render successfully and contain .logo element', () => {
		expect(logo.find('.logo').length).toBe(1)
	})

	it('Should contain .text__container element', () => {
		expect(logo.find('.text__container').length).toBe(1)
	})

	it('Should match snapshot', () => {
		expect(logo).toMatchSnapshot()
	})
})
