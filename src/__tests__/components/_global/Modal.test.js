import React from 'react'
import { shallow } from 'enzyme'
import configureStore from 'redux-mock-store'
import ConnectedModal, { Modal } from '../../../components/_global/Modal'

//Initial state for FAKE redux store to test out props
const initialModalState = {
	modals: { showModal: false, modalContent: [] },
}

//Function to render component into test
const setUp = (props) => shallow(<Modal {...props} />)

const Content = () => (
	<div className="test__content">
		<h1>TEST</h1>
	</div>
)

const modalProps = {
	modalContent: <Content />,
}

describe('Dumb modal component tests', () => {
	let modal

	//Rendering modal before each test
	beforeEach(() => {
		modal = setUp(modalProps)
	})

	//Testing that modal renders correctly
	it('Should render successfully and contain .modal__container element', () => {
		expect(modal.find('.modal__container').length).toBe(1)
	})

	//Testing that modal renders modalContent from props
	it('Should contain modal content specified in props', () => {
		expect(modal.find(Content).length).toBe(1)
	})

	//Testing component matches previos snapshots
	it('Should match snapshot', () => {
		expect(modal).toMatchSnapshot()
	})
})

describe('Testing connected to Redux Modal component', () => {
	let store, component, componentProps

	//creating fake redux store
	const mockStore = configureStore()

	//Rendering component and creating new store from initial props before each test
	beforeEach(() => {
		store = mockStore(initialModalState)
		component = shallow(<ConnectedModal store={store} />)
		componentProps = component.props()
	})

	//Testing for successfull rendering of connected component
	it('Shold render connected commponent', () => {
		expect(component.length).toEqual(1)
	})

	//Checking for userLocation props mathing in redux store and internal props
	it('modalContent prop should match with store initialState', () => {
		expect(componentProps.children.props.modalContent).toEqual(
			initialModalState.modals.modalContent
		)
	})

	//Testing component matches previos snapshots
	it('Connected component should match snapshot', () => {
		expect(component).toMatchSnapshot()
	})
})
