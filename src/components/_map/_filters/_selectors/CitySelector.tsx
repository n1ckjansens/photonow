import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from '../../../../redux/rootReducer'

// Types of props recieved from redux <mapStateToProps, mapDispatchToProps>
type PropsFromRedux = ConnectedProps<typeof connector>

// Type of props that comonent recieve
type Props = PropsFromRedux

const CitySelector: React.FC<Props> = ({ city }: Props) => (
	<div className="city__selector selector">
		<h6>{city}</h6>
		<span className="location__icon">
			<FontAwesomeIcon icon={faLocationArrow} />
		</span>
	</div>
)
// Function to work with app state through props
const mapStateToProps = (state: RootState) => {
	return {
		city: state.userLocation.city,
	}
}

// Connnector to connect component to redux and track types
const connector = connect(mapStateToProps)

export default connector(CitySelector)
