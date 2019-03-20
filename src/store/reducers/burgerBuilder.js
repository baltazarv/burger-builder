import * as actionTypes from '../actions/actionTypes';

const initialState = {
	ingredients: null,
	totalPrice: 4,
	error: false,
	buildingBurger: false
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
		case actionTypes.INIT_INGREDIENTS:
			return {
				...state,
				ingredients: {
					bacon: action.ingredients.bacon,
					lettuce: action.ingredients.lettuce,
					cheese: action.ingredients.cheese,
					meat: action.ingredients.meat
				},
				totalPrice: initialState.totalPrice,
				error: false,
				buildingBurger: false
			}
		case actionTypes.FETCH_INGREDIENTS_FAIL:
			return {
				...state,
				error: true
			};
		case actionTypes.ADD_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] + 1
				},
				totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredient],
				buildingBurger: true
			}
		case actionTypes.REMOVE_INGREDIENT:
			return {
				...state,
				ingredients: {
					...state.ingredients,
					[action.ingredient]: state.ingredients[action.ingredient] - 1
				},
				totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredient],
				buildingBurger: true
			}
		case actionTypes.SET_INGREDIENTS:
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
