import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { hideModal } from '../../redux/actions/modalActions'
import { RootState } from '../../redux/rootReducer'

// Types of props recieved from redux <mapStateToProps, mapDispatchToProps>
type PropsFromRedux = ConnectedProps<typeof connector>

// Type of props that comonent recieve
type Props = PropsFromRedux

//-----------------------------------------------------------
//-----------------------------------------------------------
// Main functional component
//-----------------------------------------------------------
//-----------------------------------------------------------
export const Modal: React.FC<Props> = ({ modalContent, hideModal }: Props) => {
	return (
		<div className="modal__container">
			<div className="modal__close__touching__zone" onClick={hideModal} />
			<div className="modal__content">{modalContent}</div>
		</div>
	)
}

// Function to work with app state through props
const mapStateToProps = (state: RootState) => {
	return {
		modalContent: state.modals.modalContent,
	}
}

// Function to get dispatch actions through props
const mapDispatchToProps = {
	hideModal,
}

// Connnector to connect component to redux and track types
const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Modal)
