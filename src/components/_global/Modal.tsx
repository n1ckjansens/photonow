import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { hideModal } from '../../redux/actions/modalActions'
import { RootState } from '../../redux/rootReducer'

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

export const Modal: React.FC<Props> = ({ modalContent, hideModal }) => {
	return (
		<div className="modal__container">
			<div className="modal__close__touching__zone" onClick={hideModal} />
			<div className="modal__content">{modalContent}</div>
		</div>
	)
}

//function to work with app state through props
const mapStateToProps = (state: RootState) => {
	return {
		modalContent: state.modals.modalContent,
	}
}

//function to get dispatch actions through props
const mapDispatchToProps = {
	hideModal,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Modal)
