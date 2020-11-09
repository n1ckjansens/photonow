import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
	faDollarSign,
	faCamera,
	faArrowLeft,
	faArrowRight,
} from '@fortawesome/free-solid-svg-icons'

//SLIDER PROP ONLY FOR TESTING PURSPOSES IN NOT TESTING MODE IT SHOLD BE FALSY
const MarkerCalloutLayout = ({testSlider = null}) => {
	//useState is used to dynamicly select slider element when page loaded (initial state is a custom slider.scroll event FOR TESTING ONLY)
	const [slider, setSlider] = useState<HTMLDivElement | null>(testSlider)

	//linking slider element with reference
	const sliderRef = useRef<HTMLDivElement>(null)

	//Finding slider element in DOM when page loaded
	React.useEffect(() => {
		const slider = sliderRef.current
		setSlider(slider)
	}, [])

	//Function to scroll slider to the left when user pressed left arrow
	const leftArrowPressed = () => {
		slider && slider.scroll({ left: slider.scrollLeft - 130, behavior: 'smooth' })
	}

	//Function to scroll slider to the right when user pressed right arrow
	const rightArrowPressed = () => {
		slider && slider.scroll({ left: slider.scrollLeft + 130, behavior: 'smooth' })
	}

	return (
		<>
			<div className="user__credentials">
				<div className="user__avatar">
					<div className="user__type">
						<FontAwesomeIcon icon={faCamera} />
					</div>
					<img
						className="user__avatar__image"
						src="https://sun1-47.userapi.com/impg/c856124/v856124902/1fba84/39E3gZWT5qk.jpg?size=200x0&quality=90&crop=416,0,1334,1334&sign=8e096f2c133c95e3720669fa1b84b1f5&ava=1"
						alt="user__avatar"
					/>
				</div>
				<h2 className="user__name">Мария Погорелова</h2>
			</div>
			<div className="user__credentials__secondary">
				<p className="user__address">Москва, пр-т Вернадского 97 к2</p>
				<p className="user__work__hours">Ежедневно 9:00 - 21:00</p>
			</div>
			<div className="user__portfolio">
				<div className="user__portfolio__nav__buttons">
					<div
						className="nav__button"
						id="toggle__previous__button"
						onClick={leftArrowPressed}
					>
						<FontAwesomeIcon icon={faArrowLeft} />
					</div>
					<div
						className="nav__button"
						id="toggle__next__button"
						onClick={rightArrowPressed}
					>
						<FontAwesomeIcon icon={faArrowRight} />
					</div>
				</div>
				<div className="portfolio__items" ref={sliderRef}>
					<div className="portfolio__item">
						<img
							src="https://sun1-92.userapi.com/8_i2e2SRmAretsIzWFrOITKsCg1yCZTht9J6VQ/4gyVPk9RqkE.jpg"
							alt=""
						/>
					</div>
					<div className="portfolio__item">
						<img
							src="https://sun1-22.userapi.com/YL7rAS7qsINWZ2I9EbqAVQTzCmDVeuA0yt2ciQ/DGrGGwLcHqE.jpg"
							alt=""
						/>
					</div>
					<div className="portfolio__item">
						<img
							src="https://sun1-21.userapi.com/w4JtHiwQHKYxWeSP1lt5NXpp8B9xPXsPMzcvjw/2tvqFEHmkEk.jpg"
							alt=""
						/>
					</div>
					<div className="portfolio__item">
						<img
							src="https://sun1-97.userapi.com/dDKYel8QHlynDQCpQLjp5BXivNSWQKqdnUfPzA/B6MhQBga3tE.jpg"
							alt=""
						/>
					</div>
					<div className="portfolio__item">
						<img
							src="https://sun1-26.userapi.com/9Tr8qUTUVLXUUtev6S9olEQG06dgviog0EIP_g/TxvYsyy-GGY.jpg"
							alt=""
						/>
					</div>
				</div>
			</div>
			<div className="user__pricing">
				<FontAwesomeIcon className="icon" icon={faDollarSign} />
				<p className="user__pricing__alert">
					Если цена не указана, фотограф свяжется с вами и уточнит цену
				</p>
			</div>
			<div className="user__services">
				<b className="user__service">Семейная фотосессия</b>
				<b className="user__service">Интерьерная сьемка</b>
			</div>
			<div className="internal__service__features">
				<div className="feature">Безопасная сделка</div>
				<div className="feature">Подарки</div>
			</div>
			<button className="user__contact__button">Написать</button>
		</>
	)
}

export default MarkerCalloutLayout
