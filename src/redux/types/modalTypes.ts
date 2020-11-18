export const SHOW_MODAL = 'MODAL/SHOW_MODAL'
export const HIDE_MODAL = 'MODAL/HIDE_MODAL'

export interface ShowModal {
	type: typeof SHOW_MODAL
	payload: JSX.Element
}

export interface HideModal {
	type: typeof HIDE_MODAL
}

export type ModalDispatchTypes = ShowModal | HideModal
