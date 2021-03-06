import React, { useEffect } from 'react'
import GoogleMapReact, { ClickEventValue } from 'google-map-react'
import { connect, ConnectedProps } from 'react-redux'
import Marker from './_marker/Marker'
import MarkerCalloutLayout from './_marker/_marker_callout/MarkerCalloutLayout'
import Filters from './_filters/Filters'
import { RootState } from '../../redux/rootReducer'
import {
	showMarkerCallout,
	hideMarkerCallout,
} from '../../redux/actions/markersActions'
import { setMarkers } from '../../redux/actions/markersActions'
import { showModal } from '../../redux/actions/modalActions'

// Types of google API key
interface GoogleApiKey {
	key: string
}

// Types of map settings
interface DefaultMapSettings {
	zoom: number
	disableDefaultUI: boolean
	clickableIcons: boolean
	disableDoubleClickZoom: boolean
}

// Types of props recieved from redux <mapStateToProps, mapDispatchToProps>
type PropsFromRedux = ConnectedProps<typeof connector>

// Type of props that comonent recieve
type Props = PropsFromRedux

//-----------------------------------------------------------
//-----------------------------------------------------------
// Main functional component
//-----------------------------------------------------------
//-----------------------------------------------------------
export const Map: React.FC<Props> = ({
	userLocation,
	markers,
	markersIds,
	showMarkerCallout,
	hideMarkerCallout,
	showModal,
	setMarkers,
}: Props) => {
	// Simulating fetching and setting markers data from server
	useEffect(() => {
		setMarkers([
			{
				id: 0,
				location: {
					lat: 55.7558,
					lng: 37.6173,
				},
				showCallout: false,
			},
			{
				id: 1,
				location: {
					lat: 55.7599,
					lng: 37.6292,
				},
				showCallout: false,
			},
		])
	}, [])

	// Getting google Api key from .env file
	const googleApiKey: GoogleApiKey = {
		key: process.env.GOOGLE_API_KEY ? process.env.GOOGLE_API_KEY : '',
	}

	// Default map settings used in GoogleMapReact
	const defaultMapSettings: DefaultMapSettings = {
		// Zoom of map
		zoom: 13,
		// Disabling default buttons of Google maps
		disableDefaultUI: true,
		// Disabling click events for landmarks (such as subway stations)
		clickableIcons: false,
		// Disabling zoom by double tap on mobile devices
		disableDoubleClickZoom: true,
	}

	// Function to track clicks on Markers and show callouts on click
	const onChildClick = (key: string) => {
		// Getting window width
		const displayWidth = window.innerWidth
		// Casting key to numeric type
		const numericKey = +key
		// If width less than 750px we sould show modal of marker callout instead of <MarkerCalloutPopup />
		if (displayWidth > 750) {
			// Calling function to show marker's callout by key
			showMarkerCallout(numericKey)
		} else {
			// Calling function to show modal of marker callout
			showModal(<MarkerCalloutLayout key={numericKey} />)
		}
	}

	// Function to track clicks on Map and hide callouts on click
	const onMapClick = ({ event }: ClickEventValue) => {
		// Condition to check if user clicking on callout then we don't need to close it
		if (!event.target.className) {
			// Function to close any open callouts
			hideMarkerCallout()
		}
	}

	return (
		<div className="map__container">
			<GoogleMapReact
				bootstrapURLKeys={googleApiKey}
				defaultZoom={defaultMapSettings.zoom}
				center={userLocation.coords}
				options={defaultMapSettings}
				onChildClick={onChildClick}
				onClick={onMapClick}
			>
				{markersIds.map((index) => {
					// Getting marker by index from store
					const marker = markers[index]
					// Rendering marker by current index
					return (
						<Marker
							lat={marker.location.lat}
							lng={marker.location.lng}
							key={marker.id}
							showCallout={marker.showCallout}
						/>
					)
				})}
			</GoogleMapReact>
			<Filters />
		</div>
	)
}

// Function to work with app state through props
const mapStateToProps = (state: RootState) => {
	return {
		userLocation: state.userLocation,
		markers: state.markers.byId,
		markersIds: state.markers.allIds,
	}
}

// Function to get dispatch actions through props
const mapDispatchToProps = {
	showMarkerCallout,
	hideMarkerCallout,
	showModal,
	setMarkers,
}

// Connnector to connect component to redux and track types
const connector = connect(mapStateToProps, mapDispatchToProps)

export default connector(Map)
