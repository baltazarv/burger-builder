import * as actionTypes from './actionTypes';
import axios from 'axios';

export const auth = (email, password, isSignedUp) => {
	return dispatch => {
		dispatch(authStart());
		const apiKey = 'AIzaSyAud45HXj_AA9kGvyR6p2qy3aP7CrQQcjM';
		let signUpMode = "signupNewUser";
		if (!isSignedUp) signUpMode = "verifyPassword";
		const reqBody = {
			email,
			password,
			returnSecureToken: true
		};
		axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${signUpMode}?key=${apiKey}`, reqBody)
			.then(resp => {
				// console.log(resp.data);
				dispatch(authSuccess(resp.data.idToken, resp.data.localId));
				dispatch(checkAuthTimeout(resp.data.expiresIn));
			})
			.catch(err => {
				// console.log(err);
				dispatch(authFailed(err.response.data.error));
			})
	}
}

export const authStart = () => {
	return {
		type: actionTypes.AUTH_START
	};
};

export const authSuccess = (idToken, localId) => {
	return {
		type: actionTypes.AUTH_SUCCESS,
		idToken,
		localId
	};
};

export const checkAuthTimeout = expirationTime => {
	return dispatch => {
		setTimeout(() => {
			dispatch(logout());
		}, expirationTime * 1000);
	}
}

export const authFailed = error => {
	return {
		type: actionTypes.AUTH_FAILED,
		error
	};
};

export const logout = () => {
	return {
		type: actionTypes.AUTH_LOGOUT
	}
}

export const setAuthRedirectPath = path => {
	return {
		type: actionTypes.SET_AUTH_REDIRECT_PATH,
		path
	}
}
