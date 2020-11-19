import { Marker } from '../reducers/markersReducer'
import {
	SHOW_MARKER_CALLOUT,
	HIDE_MARKER_CALLOUT,
	HideMarkerCallout,
	ShowMarkerCallout,
	SetMarkers,
	SET_MARKERS,
} from '../types/markersTypes'

// Function to set markers
export function setMarkers(markers: Array<Marker>): SetMarkers {
	return { type: SET_MARKERS, payload: markers }
}

// Function to show marker's callout
export function showMarkerCallout(markerId: number): ShowMarkerCallout {
	return { type: SHOW_MARKER_CALLOUT, payload: markerId }
}

// Function to hide marker's callout
export function hideMarkerCallout(): HideMarkerCallout {
	return { type: HIDE_MARKER_CALLOUT }
}
