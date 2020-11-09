import { combineReducers } from 'redux'
import { userLocationReducer } from './reducers/userLocationReducer'

export const rootReducer = combineReducers({
	userLocation: userLocationReducer,
})

export type RootState = ReturnType<typeof rootReducer>
