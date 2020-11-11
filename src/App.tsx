import React, { useEffect } from 'react'
import Header from './components/_global/Header'
import Map from './components/_map/Map'
import Modal from './components/_global/Modal'
import './_sass/index.sass'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from './redux/rootReducer'
import { getUserLocation } from './redux/actions/userLocationActions'

//Types of props recieved from redux <mapStateToProps, mapDispatchToProps>
type PropsFromRedux = ConnectedProps<typeof connector>

//Type of props that comonent recieve
type Props = PropsFromRedux

//-----------------------------------------------------------
//-----------------------------------------------------------
//Main functional component
//-----------------------------------------------------------
//-----------------------------------------------------------
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

//connnector to connect component to redux and track types
const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(App)
