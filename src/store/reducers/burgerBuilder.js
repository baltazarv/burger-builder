import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients: {
		bacon: 0,
		lettuce: 0,
		cheese: 0,
		meat: 1
	},
	totalPrice: 4,
}

const INGREDIENTS_PRICES = {
	lettuce: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

const calcTotalTime = ingredients => {
	return Object.keys(ingredients).reduce((sum, key) => {
		return sum + (INGREDIENTS_PRICES[key] * ingredients[key]);
	}, initialState.totalPrice);
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		// action.ingredient (singular)
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] + 1
				},
				totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredient]
			}
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] - 1
				},
				totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredient]
			}
		case actionTypes.ADD_INGREDIENTS:
			return {
				...state,
				ingredients: action.ingredients,
				totalPrice: calcTotalTime(action.ingredients)
			}
		default:
			return state;
	}
}

export default reducer;
