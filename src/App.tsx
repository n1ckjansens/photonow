import React, { useEffect } from 'react'
import Header from './components/_global/Header'
import Map from './components/_map/Map'
import './_sass/index.sass'
import { getUserLocation } from './redux/actions/userLocationActions'
import { connect, ConnectedProps } from 'react-redux'
import Modal from './components/_global/Modal'
import { RootState } from './redux/rootReducer'

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

const App: React.FC<Props> = ({ getUserLocation, showModal }) => {
	//Updating userLocation state when page loaded
	useEffect(() => {
		getUserLocation()
	}, [getUserLocation])

	return (
		<>
			{showModal && <Modal />}
			<Header />
			<Map />
		</>
	)
}

//function to work with app state through props
const mapStateToProps = (state : RootState) => {
	return {
		showModal: state.modals.showModal,
	}
}

//function to get dispatch actions through props
const mapDispatchToProps = {
	getUserLocation,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(App)
