import * as actionTypes from '../actions/actionTypes';

const initialState = {
	idToken: null,
	localId: null,
	error: null,
	loading: false,
	authRedirectPath: '/'
}

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.AUTH_START:
			return {
				...state,
				error: null,
				loading: true
			}
		case actionTypes.AUTH_SUCCESS:
			return {
				...state,
				idToken: action.idToken,
				localId: action.localId,
				error: null,
				loading: false
			}
		case actionTypes.AUTH_FAILED:
			return {
				...state,
				error: action.error,
				loading: false
			}
		case actionTypes.AUTH_LOGOUT:
			return {
				...state,
				idToken: null,
				localId: null
			}
		case actionTypes.SET_AUTH_REDIRECT_PATH:
			return {
				...state,
				authRedirectPath: action.path
			}
		default:
			return state;
	}
};

export default reducer;

