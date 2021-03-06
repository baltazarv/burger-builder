import reducer from './auth';
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
	it('should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			idToken: null,
			localId: null,
			error: null,
			loading: false,
			authRedirectPath: '/'
		});
	})

	it('should store the token upon login', () => {
		expect(reducer({
			idToken: null,
			localId: null,
			error: null,
			loading: false,
			authRedirectPath: '/'
		}, {
			type: actionTypes.AUTH_SUCCESS,
				idToken: 'some-token',
				localId: 'some-user-id'
			})).toEqual({
				idToken: 'some-token',
				localId: 'some-user-id',
				error: null,
				loading: false,
				authRedirectPath: '/'
			});
	})
});
