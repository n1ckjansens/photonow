import { hot } from 'react-hot-loader/root'
import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from './redux/rootReducer'
import getUserLocation from './redux/actions/userLocationActions'
import { setMarkers } from './redux/actions/markersActions'
import Header from './components/_global/Header'
import Map from './components/_map/Map'
import Modal from './components/_global/Modal'
import './_sass/index.sass'

// Types of props recieved from redux <mapStateToProps, mapDispatchToProps>
type PropsFromRedux = ConnectedProps<typeof connector>

// Type of props that comonent recieve
type Props = PropsFromRedux

//-----------------------------------------------------------
//-----------------------------------------------------------
// Main functional component
//-----------------------------------------------------------
//-----------------------------------------------------------
const App: React.FC<Props> = ({ getUserLocation, showModal }: Props) => {
	useEffect(() => {
		// Updating userLocation state when page loaded
		getUserLocation()
	}, [getUserLocation, setMarkers])

	return (
		<>
			{showModal && <Modal />}
			<Header />
			<Map />
		</>
	)
}

// Function to work with app state through props
const mapStateToProps = (state: RootState) => {
	return {
		showModal: state.modals.showModal,
	}
}

// Function to get dispatch actions through props
const mapDispatchToProps = {
	getUserLocation,
	setMarkers,
}

// Connnector to connect component to redux and track types
const connector = connect(mapStateToProps, mapDispatchToProps)

// Connecting app to redux
const connectedApp = connector(App)

// Adding Hot Module Replacement support and exporting component
export default hot(connectedApp)
