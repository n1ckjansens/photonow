import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { setTargetFilter } from '../../../../redux/actions/filtersActions'

export type TargetValues = 'Photographer' | 'Model'

interface Values {
	[key: number]: TargetValues
}

//Types of props recieved from redux <mapStateToProps, mapDispatchToProps>
type PropsFromRedux = ConnectedProps<typeof connector>

//Type of props that comonent recieve
type Props = PropsFromRedux

const ServiceTargetSelector: React.FC<Props> = ({ setTargetFilter }) => {
	//Values of targets
	const values: Values = {
		1: 'Photographer',
		2: 'Model',
	}

	//State of target selected
	const [checked, setChecked] = useState<number>(1)

	//useEffect to change target in redux state when checked value changes
	useEffect(() => {
		//Dispatching change to Redux
		setTargetFilter(values[checked])
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

//function to get dispatch actions through props
const mapDispatchToProps = {
	setTargetFilter,
}

//connnector to connect component to redux and track types
const connector = connect(null, mapDispatchToProps)

export default connector(ServiceTargetSelector)
