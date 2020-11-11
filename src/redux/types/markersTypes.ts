import { Marker } from '../reducers/markersReducer'

export const SET_MARKERS = 'MARKERS/SET_MARKERS'
export const SHOW_MARKER_CALLOUT = 'MARKERS/SHOW_MARKER_CALLOUT'
export const HIDE_MARKER_CALLOUT = 'MARKERS/HIDE_MARKER_CALLOUT'

export interface SetMarkers {
	type: typeof SET_MARKERS
	payload: Array<Marker>
}

export interface ShowMarkerCallout {
	type: typeof SHOW_MARKER_CALLOUT
	payload: number
}

export interface HideMarkerCallout {
	type: typeof HIDE_MARKER_CALLOUT
}

export type MarkersDispatchTypes =
	| ShowMarkerCallout
	| HideMarkerCallout
	| SetMarkers
