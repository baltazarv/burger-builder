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
				const expirationDate = new Date(new Date().getTime() + resp.data.expiresIn * 1000);
				localStorage.setItem('idToken', resp.data.idToken);
				localStorage.setItem('localId', resp.data.localId);
				localStorage.setItem('expirationDate', expirationDate);
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
	localStorage.removeItem('idToken');
	localStorage.removeItem('localId');
	localStorage.removeItem('expirationDate');
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

export const authCheckState = () => {
	return dispatch => {
		const idToken = localStorage.getItem('idToken');
		if (!idToken) {
			dispatch(logout());
		} else {
			const expirationDate = new Date(localStorage.getItem('expirationDate'));
			if (expirationDate > new Date()) {
				const localId = localStorage.getItem('localId');
				dispatch(authSuccess(idToken, localId));
				dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
			} else {
				dispatch(logout());
			}
		}
	}
}
