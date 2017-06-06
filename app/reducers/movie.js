import * as actionTypes from '../constants/movie'

const initialState = {
	
}

export default function movies(state = initialState, action) {
	switch (action.type) {
		case actionTypes.MOVIELIST_FETCH:
			return action.data
		default:
			return state
	}
}
