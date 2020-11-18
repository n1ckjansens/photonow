import React from 'react'

const Logo: React.FC = () => {
	return (
		<div className="logo">
			<div className="img__container">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="16.875"
					height="22.5"
					viewBox="0 0 16.875 22.5"
				>
					<g id="Logo" transform="translate(-150 -26)">
						<path
							id="map-marker-solid"
							d="M7.57,22.046C1.185,12.789,0,11.839,0,8.437a8.437,8.437,0,1,1,16.875,0c0,3.4-1.185,4.352-7.57,13.609a1.055,1.055,0,0,1-1.734,0Z"
							transform="translate(150 26)"
							fill="#fff"
						/>
						<path
							id="camera-solid"
							d="M8.179,33.789v4.6a.767.767,0,0,1-.767.767H.767A.767.767,0,0,1,0,38.39v-4.6a.767.767,0,0,1,.767-.767H2.173l.2-.526a.766.766,0,0,1,.717-.5h2a.766.766,0,0,1,.717.5l.2.526H7.413A.767.767,0,0,1,8.179,33.789Zm-2.173,2.3A1.917,1.917,0,1,0,4.09,38.007,1.919,1.919,0,0,0,6.007,36.09Zm-.511,0A1.406,1.406,0,1,1,4.09,34.684,1.408,1.408,0,0,1,5.5,36.09Z"
							transform="translate(154.358 -1.101)"
							fill="#479cdc"
						/>
					</g>
				</svg>
			</div>
			<div className="text__container">
				<div className="logo__text text__primary">
					<h5>Photo</h5>
				</div>
				<div className="logo__text text__secondary">
					<h5>Now</h5>
				</div>
			</div>
		</div>
	)
}

export default Logo
