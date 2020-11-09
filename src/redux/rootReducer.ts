import { combineReducers } from 'redux'
import { markersReducer } from './reducers/markersReducer'
import { modalsReducer } from './reducers/modalReducer'
import { userLocationReducer } from './reducers/userLocationReducer'

export const rootReducer = combineReducers({
	userLocation: userLocationReducer,
	markers: markersReducer,
	modals: modalsReducer,
})

export type RootState = ReturnType<typeof rootReducer>
