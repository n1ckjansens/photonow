import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown, faCameraRetro } from '@fortawesome/free-solid-svg-icons'

const ServiceTypeSelector: React.FC = () => (
	<>
		<div className="service__type__selector selector">
			<h6>Выберите тип Сьемки</h6>
			<span className="dropdown__icon">
				<FontAwesomeIcon icon={faCaretDown} />
			</span>
		</div>
		<div className="services__list">
			<div className="service">
				<div className="service__icon">
					<FontAwesomeIcon icon={faCameraRetro} />
				</div>
				Семейная
			</div>
			<div className="service">
				<div className="service__icon">
					<FontAwesomeIcon icon={faCameraRetro} />
				</div>
				Интерьерная
			</div>
			<div className="service">
				<div className="service__icon">
					<FontAwesomeIcon icon={faCameraRetro} />
				</div>
				Бизнесс
			</div>
		</div>
	</>
)

export default ServiceTypeSelector
