import {
	SHOW_MODAL,
	HIDE_MODAL,
	ShowModal,
	HideModal,
} from '../types/modalTypes'

// Function to show modal with content specified in the props
export function showModal(modalContent: JSX.Element): ShowModal {
	return { type: SHOW_MODAL, payload: modalContent }
}

// Function to hide modal
export function hideModal(): HideModal {
	return { type: HIDE_MODAL }
}
