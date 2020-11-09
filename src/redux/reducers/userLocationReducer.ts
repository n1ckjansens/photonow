interface userLocationState {
	lat: number
	lng: number
}

const initialState: userLocationState = {
	lat: 44.6,
	lng: 33.5,
}

export const userLocationReducer = (state = initialState, action: any) => {
	switch (action) {
		default:
			return state
	}
}
