import React from 'react'
import MarkerCalloutPopup from './_marker_callout/MarkerCalloutPopup'

//Types if props component recieve
interface Props {
	showCallout : boolean,
	lat: number, 
	lng: number
}

//Main functional component
const Marker: React.FC<Props> = ({ showCallout }) => {
	return (
		<div className="marker__container">
			{showCallout && <MarkerCalloutPopup />}
			<div className="pin bounce">
				<div className="user__avatar">
					<img
						src="https://sun1-47.userapi.com/impg/c856124/v856124902/1fba84/39E3gZWT5qk.jpg?size=200x0&quality=90&crop=416,0,1334,1334&sign=8e096f2c133c95e3720669fa1b84b1f5&ava=1"
						alt="user__avatar"
					/>
				</div>
			</div>
			<div className="pulse" />
		</div>
	)
}

export default Marker
