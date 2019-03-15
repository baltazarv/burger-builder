import * as actionTypes from './actionTypes';

export const addIngredient = ingredient => {
	return {
		type: actionTypes.ADD_INGREDIENT,
		ingredient
	}
};

export const removeIngredient = ingredient => {
	return {
		type: actionTypes.REMOVE_INGREDIENT,
		ingredient
	}
};

export const addIngredients = ingredients => {
	return {
		type: actionTypes.ADD_INGREDIENTS,
		ingredients
	}
};
