import { HIDE_MODAL, ModalDispatchTypes, SHOW_MODAL } from '../types/modalTypes'

interface modalsDefaultState {
	showModal: boolean
	modalContent: JSX.Element | null
}

const initialState: modalsDefaultState = {
	showModal: false,
	modalContent: null,
}

export const modalsReducer = (
	state = initialState,
	action: ModalDispatchTypes
): modalsDefaultState => {
	switch (action.type) {
		case SHOW_MODAL:
			if (!state.showModal) {
				return { showModal: true, modalContent: action.payload }
			} else {
				return state
			}
		case HIDE_MODAL:
			return { showModal: false, modalContent: null }
		default:
			return state
	}
}
