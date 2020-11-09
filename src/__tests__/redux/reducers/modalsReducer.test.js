import React from 'react'
import MarkerCalloutLayout from '../../../components/_map/_marker/_marker_callout/MarkerCalloutLayout'
import { modalsReducer } from '../../../redux/reducers/modalsReducer'
import { HIDE_MODAL, SHOW_MODAL } from '../../../redux/types/modalTypes'

const TestComponent = () => <div className="test"></div>

describe('User location reducer test', () => {
	//Testing that reducer returns initial state
	it('Should return initial state', () => {
		expect(modalsReducer(undefined, {})).toEqual({
			showModal: false,
			modalContent: [],
		})
	})

	//Testing that reducer correctly working with SHOW_MODAL event
	it('Should handle SHOW_MODAL', () => {
		expect(
			modalsReducer(undefined, {
				type: SHOW_MODAL,
				payload: <MarkerCalloutLayout />,
			})
		).toEqual({
			showModal: true,
			modalContent: [<MarkerCalloutLayout />],
		})
	})

	//Testing that reducer correctly working with SHOW_MODAL event when modal is already opened
	it('Should handle SHOW_MODAL and check if any modal open', () => {
		expect(
			modalsReducer(
				{
					showModal: true,
					modalContent: [<MarkerCalloutLayout />],
				},
				{
					type: SHOW_MODAL,
					payload: <TestComponent />,
				}
			)
		).toEqual({
			showModal: true,
			modalContent: [<MarkerCalloutLayout />],
		})
	})

	//Testing that reducer correctly working with HIDE_MODAL event
	it('Should handle HIDE_MODAL', () => {
		expect(
			modalsReducer(undefined, {
				type: HIDE_MODAL,
			})
		).toEqual({
			showModal: false,
			modalContent: [],
		})
	})
})
