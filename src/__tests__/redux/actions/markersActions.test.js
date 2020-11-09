import {
	SHOW_MARKER_CALLOUT,
	HIDE_MARKER_CALLOUT,
} from '../../../redux/types/markersTypes'
import {
	showMarkerCallout,
	hideMarkerCallout,
} from '../../../redux/actions/markersActions'

describe('Redux markerActions test', () => {
	it('showMarkerCallout should return correct data', () => {
		expect(showMarkerCallout(0)).toStrictEqual({
			type: SHOW_MARKER_CALLOUT,
			payload: 0,
		})
	})

	it('hideMarkerCallout should return correct data', () => {
		expect(hideMarkerCallout()).toStrictEqual({ type: HIDE_MARKER_CALLOUT })
	})
})
