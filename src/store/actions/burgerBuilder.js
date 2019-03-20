import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

// async action creators

export const getIngredients = () => {
	return dispatch => {
		axios.get('https://burger-builder-6d2ad.firebaseio.com/ingredients.json')
			.then(resp => {
				dispatch(initIngredients(resp.data));
			})
			.catch(err => {
				dispatch(fetchIngredientsFailed());
			})
	};
};

// sync action creators

export const initIngredients = ingredients => {
	return {
		type: actionTypes.INIT_INGREDIENTS,
		ingredients
	};
}

export const fetchIngredientsFailed = () => {
	return {
		type: actionTypes.FETCH_INGREDIENTS_FAIL
	};
};

export const addIngredient = ingredient => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredient
	};
};

export const removeIngredient = ingredient => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredient
	};
};

// export const setIngredients = ingredients => {
// 	return {
// 		type: actionTypes.SET_INGREDIENTS,
// 		ingredients
// 	};
// }
