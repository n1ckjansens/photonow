import {
	SHOW_MARKER_CALLOUT,
	HIDE_MARKER_CALLOUT,
	HideMarkerCallout,
	ShowMarkerCallout,
} from '../types/markersTypes'

//Function to show marker's callout
export function showMarkerCallout(markerId: number): ShowMarkerCallout {
	return { type: SHOW_MARKER_CALLOUT, payload: markerId }
}

//Function to hide marker's callout
export function hideMarkerCallout(): HideMarkerCallout {
	return { type: HIDE_MARKER_CALLOUT }
}
