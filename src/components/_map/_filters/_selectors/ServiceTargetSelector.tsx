import React, { useEffect, useState } from 'react'

interface Values {
	[key: number]: 'Photographer' | 'Model'
}

const ServiceTargetSelector: React.FC = () => {
	const values: Values = {
		1: 'Photographer',
		2: 'Model',
	}

	const [checked, setChecked] = useState<number>(1)

	useEffect(() => {
		//TODO: add redux change function
		console.log(values[checked])
	}, [checked])

	return (
		<div className="service__selector">
			<div className="service">
				<div className={`background ${checked === 2 && 'active-2'}`} />
				<div
					onClick={() => setChecked(1)}
					className={`item ${checked === 1 && 'active'}`}
				>
					Фотограф
				</div>
				<div
					onClick={() => setChecked(2)}
					className={`item ${checked === 2 && 'active'}`}
				>
					Модель
				</div>
			</div>
		</div>
	)
}

export default ServiceTargetSelector
