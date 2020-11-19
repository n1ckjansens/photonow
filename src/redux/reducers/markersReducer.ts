import { combineReducers } from 'redux'
import {
	HIDE_MARKER_CALLOUT,
	MarkersDispatchTypes,
	SET_MARKERS,
	SHOW_MARKER_CALLOUT,
} from '../types/markersTypes'
import { mapKeys, mapValues } from 'lodash'

//Type of marker state
export interface Marker {
	id: number
	location: {
		lat: number
		lng: number
	}
	showCallout: boolean
}

// Types of initial state by ID
interface InitialStateById {
	[key: number]: Marker
}

// Type of initial state of all ids
type InitialStateAllIds = Array<number>

// Initial state by id
const INITIAL_STATE_BY_ID: InitialStateById = {}

// Initial state All ids
const INITIAL_STATE_ALL_IDS: InitialStateAllIds = []

// Function to process opening process of marker callout
// Function finds any open callouts with id different from action.payload and closes it
const processShowMarkerCallout = (
	state: InitialStateById,
	markerIndex: number
): InitialStateById => {
	return mapValues(state, (_, index) => {
		// Casting index value from string to number
		const numericIndex = +index
		// Checking if callout of chosen marker is closed and id matches
		if (!state[numericIndex].showCallout && numericIndex === markerIndex) {
			return {
				...state[numericIndex],
				showCallout: true,
			}
			// Checking if any callouts is open, if found - closing it
		} else if (
			state[numericIndex].showCallout &&
			numericIndex !== markerIndex
		) {
			return {
				...state[numericIndex],
				showCallout: false,
			}
		}
		// If no conditions kept - returning existing state
		return { ...state[numericIndex] }
	})
}

// Function to process hiding process of marker callout
// Function finds any open callouts and closes it
const processHideMarkerCallout = (
	state: InitialStateById
): InitialStateById => {
	return mapValues(state, (_, index) => {
		//Casting index value from string to number
		const numericIndex = +index
		//Finding for any markers with open callouts, if found - closing it
		if (state[numericIndex].showCallout) {
			return { ...state[numericIndex], showCallout: false }
		}
		//If no markers with open callouts found - returning existing state
		return { ...state[numericIndex] }
	})
}

//-----------------------------------------------------------
//-----------------------------------------------------------
// Main Reducers
//-----------------------------------------------------------
//-----------------------------------------------------------

// Reducer to work with normilized markers state
const byId = (
	state: InitialStateById = INITIAL_STATE_BY_ID,
	action: MarkersDispatchTypes
): InitialStateById => {
	switch (action.type) {
		// Function to set markers from server
		case SET_MARKERS:
			// Normalizing data from Array to Object and Returning it
			return mapKeys(action.payload, 'id')
		// Function to show marker's callout
		case SHOW_MARKER_CALLOUT:
			return processShowMarkerCallout(state, action.payload)
		// Function to hide marker's callout
		case HIDE_MARKER_CALLOUT:
			return processHideMarkerCallout(state)
		default:
			return state
	}
}

// Reducer to track all ID's
const allIds = (
	state: InitialStateAllIds = INITIAL_STATE_ALL_IDS,
	action: MarkersDispatchTypes
) => {
	switch (action.type) {
		// Updating Id's on markers setting
		case SET_MARKERS:
			return action.payload.map((_, index) => {
				return index
			})
		default:
			return state
	}
}

/*
---------------------------------------------------------
Combined Reducers should return nomilized state like: 
---------------------------------------------------------
{
	byId: {
		0: {
			id: 0,
			location: {
				lat: 55.7558,
				lng: 37.6173,
			},
			showCallout: false,
		},
		1: {
			id: 1,
			location: {
				lat: 55.7599,
				lng: 37.6292,
			},
			showCallout: false,
		},
	},
	allIds: [0, 1]
}
---------------------------------------------------------
*/

export const markersReducer = combineReducers({ byId, allIds })
