import React from 'react'
import { shallow } from 'enzyme'
import Header from '../../../components/_global/Header'
import Logo from '../../../components/_global/Logo'

//Function to render component into test
const setUp = (props) => shallow(<Header {...props} />)

describe('Header component tests', () => {
	let header

	beforeEach(() => {
		header = setUp()
	})

	it('Should render successfully and contain <header> element', () => {
		expect(header.find('header').length).toBe(1)
	})

	it('Should contain <Logo /> element', () => {
		expect(header.find(Logo).length).toBe(1)
	})

	it('Should match snapshot', () => {
		expect(header).toMatchSnapshot()
	})
})
