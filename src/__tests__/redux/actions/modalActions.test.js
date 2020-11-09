import React from 'react'
import { showModal, hideModal } from '../../../redux/actions/modalActions'
import { SHOW_MODAL, HIDE_MODAL } from '../../../redux/types/modalTypes'
import MarkerCalloutLayout from '../../../components/_map/_marker/_marker_callout/MarkerCalloutLayout'

describe('Redux modal actions test', () => {
	it('showModal should return correct data', () => {
		expect(showModal(<MarkerCalloutLayout />)).toStrictEqual({
			type: SHOW_MODAL,
			payload: <MarkerCalloutLayout />,
		})
	})

	it('hideModal should return correct data', () => {
		expect(hideModal()).toStrictEqual({ type: HIDE_MODAL })
	})
})
