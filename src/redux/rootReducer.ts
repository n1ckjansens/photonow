import { combineReducers } from 'redux'
import { filtersReducer } from './reducers/filtersReducer'
import { markersReducer } from './reducers/markersReducer'
import modalsReducer from './reducers/modalsReducer'
import { userLocationReducer } from './reducers/userLocationReducer'

export const rootReducer = combineReducers({
	userLocation: userLocationReducer,
	markers: markersReducer,
	modals: modalsReducer,
	filters: filtersReducer,
})

export type RootState = ReturnType<typeof rootReducer>
