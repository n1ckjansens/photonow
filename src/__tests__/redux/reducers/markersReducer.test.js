import { markersReducer } from '../../../redux/reducers/markersReducer'
import {
	SHOW_MARKER_CALLOUT,
	HIDE_MARKER_CALLOUT,
	SET_MARKERS,
} from '../../../redux/types/markersTypes'

describe('Markers reducer test', () => {
	//Testing that reducer returns initial state
	it('Should return initial state', () => {
		expect(markersReducer(undefined, {})).toEqual([
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
	})

	//Testing that reducer correctly working with SHOW_MARKER_CALLOUT event
	it('Should handle SHOW_MARKER_CALLOUT', () => {
		expect(
			markersReducer(undefined, {
				type: SHOW_MARKER_CALLOUT,
				payload: 0,
			})
		).toEqual([
			{
				id: 0,
				location: {
					lat: 55.7558,
					lng: 37.6173,
				},
				showCallout: true,
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
	})
	//Testing that reducer analyzing on SHOW_MARKER_CALLOUT event if any callouts open - close and open another
	it('Should analyze on SHOW_MARKER_CALLOUT event if any callouts open - close and open another', () => {
		expect(
			markersReducer(
				[
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
						showCallout: true,
					},
				],
				{
					type: SHOW_MARKER_CALLOUT,
					payload: 0,
				}
			)
		).toEqual([
			{
				id: 0,
				location: {
					lat: 55.7558,
					lng: 37.6173,
				},
				showCallout: true,
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
	})
	//Testing that reducer correctly handling HIDE_MARKER_CALLOUT event
	it('Should handle HIDE_MARKER_CALLOUT', () => {
		expect(
			markersReducer(
				[
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
						showCallout: true,
					},
				],
				{
					type: HIDE_MARKER_CALLOUT,
				}
			)
		).toEqual([
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
	})
	//Testing that reducer correctly handling SET_MARKERS event
	it('Should handle SET_MARKERS', () => {
		expect(
			markersReducer([], {
				type: SET_MARKERS,
				payload: [
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
				],
			})
		).toEqual([
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
	})
})
