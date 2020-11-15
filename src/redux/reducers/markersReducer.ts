import { combineReducers } from 'redux'
import {
	HIDE_MARKER_CALLOUT,
	MarkersDispatchTypes,
	SET_MARKERS,
	SHOW_MARKER_CALLOUT,
} from '../types/markersTypes'
import { mapKeys, mapValues } from 'lodash'

//Type of marker state
export type Marker = {
	id: number
	location: {
		lat: number
		lng: number
	}
	showCallout: boolean
}

//Types of initial state by ID
interface InitialStateById {
	[key: number]: Marker
}

//Tpe of initial state of all ids
type InitialStateAllIds = Array<number>

//initial state by id
const INITIAL_STATE_BY_ID: InitialStateById = {}

//initial state All ids
const INITIAL_STATE_ALL_IDS: InitialStateAllIds = []

//Reducer to work with normilized markers state
const byId = (
	state: InitialStateById = INITIAL_STATE_BY_ID,
	action: MarkersDispatchTypes
): InitialStateById => {
	switch (action.type) {
		//Function to set markers from server
		case SET_MARKERS:
			const markers = mapKeys(action.payload, 'id')
			return markers
		//Function to show marker's callout
		case SHOW_MARKER_CALLOUT:
			return mapValues(state, (_, index) => {
				//Casting index value from string to number
				const numericIndex = Number(index)
				//Checking if callout of chosen marker is closed and id matches
				if (
					!state[numericIndex].showCallout &&
					numericIndex === action.payload
				) {
					return {
						...state[numericIndex],
						showCallout: true,
					}
					//Checking if any callouts is open, if found - closing it
				} else if (
					state[numericIndex].showCallout &&
					numericIndex !== action.payload
				) {
					return {
						...state[numericIndex],
						showCallout: false,
					}
					//If no conditions kept - returning existing state
				} else {
					return { ...state[numericIndex] }
				}
			})
		//Function to hide marker's callout
		case HIDE_MARKER_CALLOUT:
			return mapValues(state, (_, index) => {
				//Casting index value from string to number
				const numericIndex = Number(index)
				//Finding for any markers with open callouts, if found - closing it
				if (state[numericIndex].showCallout) {
					return { ...state[numericIndex], showCallout: false }
					//If no markers with open callouts found - returning existing state
				} else {
					return { ...state[numericIndex] }
				}
			})
		default:
			return state
	}
}

//Reducer to track all ID's
const allIds = (
	state: InitialStateAllIds = INITIAL_STATE_ALL_IDS,
	action: MarkersDispatchTypes
) => {
	switch (action.type) {
		//Updating Id's on markers setting
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
