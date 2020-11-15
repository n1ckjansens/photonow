import React from 'react'
import GoogleMapReact, { ClickEventValue } from 'google-map-react'
import Marker from './_marker/Marker'
import MarkerCalloutLayout from './_marker/_marker_callout/MarkerCalloutLayout'
import Filters from './_filters/Filters'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../redux/rootReducer'
import {
	showMarkerCallout,
	hideMarkerCallout,
} from '../../redux/actions/markersActions'
import { showModal } from '../../redux/actions/modalActions'

//Types of google API key
interface IgoogleApiKey {
	key: string
}

//Types of map settings
interface IdefaultMapSettings {
	zoom: number,
	disableDefaultUI: boolean,
	clickableIcons: boolean,
	disableDoubleClickZoom: boolean,
}

//Types of props recieved from redux <mapStateToProps, mapDispatchToProps>
type PropsFromRedux = ConnectedProps<typeof connector>

//Type of props that comonent recieve
type Props = PropsFromRedux

//-----------------------------------------------------------
//-----------------------------------------------------------
//Main functional component
//-----------------------------------------------------------
//-----------------------------------------------------------
export const Map: React.FC<Props> = ({
	userLocation,
	markers,
	markersIds,
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
				{markersIds.map((index) => (
					<Marker
						lat={markers[index].location.lat}
						lng={markers[index].location.lng}
						key={markers[index].id}
						showCallout={markers[index].showCallout}
					/>
				))}
			</GoogleMapReact>
			<Filters />
		</div>
	)
}

//function to work with app state through props
const mapStateToProps = (state: RootState) => {
	return {
		userLocation: state.userLocation,
		markers: state.markers.byId,
		markersIds: state.markers.allIds
	}
}

//function to get dispatch actions through props
const mapDispatchToProps = {
	showMarkerCallout,
	hideMarkerCallout,
	showModal,
}

//connnector to connect component to redux and track types
const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Map)
