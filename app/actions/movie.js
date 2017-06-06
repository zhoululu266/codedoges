import * as actionTypes from '../constants/movie'

export function fetchMovielist(data) {
	return {type: actionTypes.MOVIELIST_FETCH, data}
}
