import {
	HIDE_MARKER_CALLOUT,
	MarkersDispatchTypes,
	SET_MARKERS,
	SHOW_MARKER_CALLOUT,
} from '../types/markersTypes'

interface markersDefaultState {
	id: number
	location: {
		lat: number
		lng: number
	}
	showCallout: boolean
}

const initialState: markersDefaultState[] = [
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
]

export const markersReducer = (
	state: markersDefaultState[] = initialState,
	action: MarkersDispatchTypes
): markersDefaultState[] => {
	switch (action.type) {
		//Function to set markers from server
		case SET_MARKERS:
			return action.payload
		//Function to show marker's callout
		case SHOW_MARKER_CALLOUT:
			return state.map((marker) => {
				//Checking if callout of chosen marker is closed and id matches
				if (!marker.showCallout && marker.id === action.payload) {
					return { ...marker, showCallout: true }
					//Checking if any callouts is open, if found - closing it
				} else if (marker.showCallout && marker.id !== action.payload) {
					return { ...marker, showCallout: false }
					//If no conditions kept - returning existing state
				} else {
					return { ...marker }
				}
			})
		//Function to hide marker's callout
		case HIDE_MARKER_CALLOUT:
			return state.map((marker) => {
				//Finding for any markers with open callouts, if found - closing it
				if (marker.showCallout) {
					return { ...marker, showCallout: false }
					//If no markers with open callouts found - returning existing state
				} else {
					return { ...marker }
				}
			})
		default:
			return state
	}
}
