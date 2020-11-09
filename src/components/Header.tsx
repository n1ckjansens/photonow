import React from 'react'
import Logo from './Logo'

const Header: React.FC = () => {
	return (
		<header>
			<div className="header__branding">
				<a href="/">
					<Logo />
				</a>
			</div>
		</header>
	)
}

export default Header
