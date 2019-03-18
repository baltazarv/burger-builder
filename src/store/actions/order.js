import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

// purchase

export const purchaseBurger = order => {
	return dispatch => {
		dispatch(purchaseBurgerStart());
		axios.post('/orders.json', order)
			.then(resp => {
				console.log(resp.data)
				dispatch(purchaseOrderSuccess(resp.data.name, order));
			})
			.catch(err => {
				dispatch(purchaseOrderFailed(err));
			});
	};
};

export const purchaseBurgerStart = () => {
	return {
		type: actionTypes.PURCHASE_BURGER_START
	};
};

export const purchaseInit = () => {
	return {
		type: actionTypes.PURCHASE_INIT
	}
}

export const purchaseOrderSuccess = (id, orderData) => {
	return {
		type: actionTypes.PURCHASE_ORDER_SUCCESS,
		id,
		orderData
	};
};

export const purchaseOrderFailed = error => {
	return {
		type: actionTypes.PURCHASE_ORDER_FAILED,
		error
	};
};

// get order info

export const fetchOrders = () => {
	return dispatch => {
		dispatch(fetchOrdersStart());
		axios.get('/orders.json')
			.then(resp => {
				const orders = Object.entries(resp.data).map(order => {
					return {...order[1], id: order[0]}
				});
				dispatch(fetchOrdersSuccess(orders));
			})
			.catch(err => {
				dispatch(fetchOrdersFail(err))
			})
	}
}

export const fetchOrdersSuccess = orders => {
	return {
		type: actionTypes.FETCH_ORDERS_SUCCESS,
		orders
	};
};

export const fetchOrdersFail = error => {
	return {
		type: actionTypes.FETCH_ORDERS_FAILED,
		error
	};
};

export const fetchOrdersStart = () => {
	return {
		type: actionTypes.FETCH_ORDERS_START
	}
}
