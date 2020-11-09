import React from 'react'
import { render } from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { applyMiddleware, compose, createStore } from 'redux'
import { rootReducer } from './redux/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'


//Adding __REDUX_DEVTOOLS_EXTENSION__ to TypeScript window object
declare global {
    interface Window {
		__REDUX_DEVTOOLS_EXTENSION__?: typeof compose
    }
}

//variable to enable redux Dev tools
let reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__
	? window.__REDUX_DEVTOOLS_EXTENSION__()
	: (a : any) => a

//Condition to disable redux Dev tools in production mode
if (process.env.NODE_ENV === 'production') {
	reduxDevTools = (a :any) => a
}

//creating redux store
const store = createStore(
	rootReducer,
	compose(applyMiddleware(thunk), reduxDevTools)
)

const app = (
	<Provider store={store}>
		<App />
	</Provider>
)

render(app, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
