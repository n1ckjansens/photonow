import React from 'react'
import GoogleMapReact, { ClickEventValue } from 'google-map-react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import Marker from './_marker/Marker'
import {
	showMarkerCallout,
	hideMarkerCallout,
} from '../../redux/actions/markersActions'
import { showModal } from '../../redux/actions/modalActions'
import MarkerCalloutLayout from './_marker/_marker_callout/MarkerCalloutLayout'

interface IgoogleApiKey {
	key: string
}

interface IdefaultMapSettings {
	zoom: number,
	disableDefaultUI: boolean,
	clickableIcons: boolean,
	disableDoubleClickZoom: boolean,
}

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux

export const Map: React.FC<Props> = ({
	userLocation,
	markers,
	showMarkerCallout,
	hideMarkerCallout,
	showModal,
}) => {
	//Getting google Api key from .env file
	const googleApiKey : IgoogleApiKey = {
		key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
	}

	//default map settings used in GoogleMapReact
	const defaultMapSettings : IdefaultMapSettings = {
		//zoom of map
		zoom: 13,
		//disabling default buttons of Google maps
		disableDefaultUI: true,
		//disabling click events for landmarks (such as subway stations)
		clickableIcons: false,
		//disabling zoom by double tap on mobile devices
		disableDoubleClickZoom: true,
	}

	//Function to track clicks on Markers and show callouts on click
	const onChildClick = (key: string) => {
		//Getting window width
		const displayWidth = window.innerWidth
		//casting key to numeric type
		const numericKey = Number(key)
		//If width less than 750px we sould show modal of marker callout instead of <MarkerCalloutPopup />
		if (displayWidth > 750) {
			//calling function to show marker's callout by key
			showMarkerCallout(numericKey)
		} else {
			//calling function to show modal of marker callout
			showModal(<MarkerCalloutLayout key={numericKey} />)
		}
	}

	//Function to track clicks on Map and hide callouts on click
	const onMapClick = ({ event }: ClickEventValue) => {
		//Condition to check if user clicking on callout then we don't need to close it
		if (!event.target.className) {
			//Function to close any open callouts
			hideMarkerCallout()
		}
	}

	return (
		<div className="map__container">
			<GoogleMapReact
				bootstrapURLKeys={googleApiKey}
				defaultZoom={defaultMapSettings.zoom}
				center={userLocation}
				options={defaultMapSettings}
				onChildClick={onChildClick}
				onClick={onMapClick}
			>
				{markers.map((marker) => (
					<Marker
						lat={marker.location.lat}
						lng={marker.location.lng}
						key={marker.id}
						showCallout={marker.showCallout}
					/>
				))}
			</GoogleMapReact>
		</div>
	)
}

//function to work with app state through props
const mapStateToProps = (state: RootState) => {
	return {
		userLocation: state.userLocation,
		markers: state.markers,
	}
}

//function to get dispatch actions through props
const mapDispatchToProps = {
	showMarkerCallout,
	hideMarkerCallout,
	showModal,
}

const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Map)
