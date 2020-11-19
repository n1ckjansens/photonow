import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'

const CitySelector: React.FC = () => (
	<div className="city__selector selector">
		<h6>Москва</h6>
		<span className="location__icon">
			<FontAwesomeIcon icon={faLocationArrow} />
		</span>
	</div>
)

export default CitySelector
