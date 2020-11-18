import { HIDE_MODAL, ModalDispatchTypes, SHOW_MODAL } from '../types/modalTypes'

//Types of initial state
interface InitialState {
	showModal: boolean
	modalContent: JSX.Element | null
}

//initial state
const INITIAL_STATE: InitialState = {
	showModal: false,
	modalContent: null,
}

export const modalsReducer = (
	state: InitialState = INITIAL_STATE,
	action: ModalDispatchTypes
): InitialState => {
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
