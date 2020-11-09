import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import config from '../config/default'
// eslint-disable-next-line
import { googleApiKey, defaultMapSettings } from '../interfaces/mapInterfaces'
import { connect } from 'react-redux'
import { RootState } from '../redux/rootReducer'
import { getUserLocation } from '../redux/actions/userLocationActions'

type Props = any

const Map: React.FC<Props> = (props) => {
	useEffect(() => {
		props.getUserLocation()
	}, [props])

	const googleApiKey: googleApiKey = {
		key: config.googleMapsApiKey,
	}

	const defaultMapSettings: defaultMapSettings = {
		center: {
			lat: props!.userLocation!.lat,
			lng: props!.userLocation!.lng,
		},
		zoom: 13,
	}

	return (
		<div className="map__container">
			<GoogleMapReact
				bootstrapURLKeys={googleApiKey}
				defaultCenter={defaultMapSettings.center}
				defaultZoom={defaultMapSettings.zoom}
			></GoogleMapReact>
		</div>
	)
}

const mapStateToProps = (state: RootState) => {
	return {
		userLocation: state.userLocation,
	}
}

const mapDispatchToProps = {
	getUserLocation,
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)
