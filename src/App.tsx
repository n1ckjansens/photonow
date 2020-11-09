import React from 'react'
import Header from './components/Header'
import Map from './components/Map'
import './_sass/index.sass'

const App: React.FC = () => {
	return (
		<>
			<Header />
			<Map />
		</>
	)
}

export default App
