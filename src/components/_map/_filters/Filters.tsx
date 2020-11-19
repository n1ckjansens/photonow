import React from 'react'
import CitySelector from './_selectors/CitySelector'
import ServiceTargetSelector from './_selectors/ServiceTargetSelector'
import ServiceTypeSelector from './_selectors/ServiceTypeSelector'

const Filters: React.FC = () => {
	return (
		<div className="filters__container">
			{/* Selector of city */}
			<CitySelector />
			{/* Selector of Service Target (Photographer or Model) */}
			<ServiceTargetSelector />
			{/* Selector of services type available */}
			<ServiceTypeSelector />
		</div>
	)
}

export default Filters
