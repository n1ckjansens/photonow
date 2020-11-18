import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faLocationArrow,
    faCaretDown,
    faCameraRetro
} from '@fortawesome/free-solid-svg-icons'

const Filters: React.FC = () => {
    return (
        <div className='filters__container'>
            <div className="city__selector selector">
                <h6>Москва</h6>
                <span className='location__icon'>
                    <FontAwesomeIcon icon={faLocationArrow}/>
                </span>
            </div>
            <div className="service__selector">
                <div className="service">
                    <div className="item _active">
                        Фотограф
                    </div>
                    <div className="item">
                        Модель
                    </div>
                </div>
            </div>
            <div className="service__type__selector selector">
                <h6>Выберите тип Сьемки</h6>
                <span className='dropdown__icon'>
                    <FontAwesomeIcon icon={faCaretDown}/>
                </span>
            </div>
            <div className="services__list">
                <div className="service">
                    <div className="service__icon">
                        <FontAwesomeIcon icon={faCameraRetro}/>
                    </div>
                        Семейная
                </div>
                <div className="service">
                    <div className="service__icon">
                        <FontAwesomeIcon icon={faCameraRetro}/>
                    </div>
                        Интерьерная
                </div>
                <div className="service">
                    <div className="service__icon">
                        <FontAwesomeIcon icon={faCameraRetro}/>
                    </div>
                        Бизнесс
                </div>
            </div>
        </div>
    )
}

export default Filters