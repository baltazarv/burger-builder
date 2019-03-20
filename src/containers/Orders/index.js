import React, { Component } from 'react';
import Order from '../../components/Order';
import axios from '../../axios-order';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import withErrorHandler from '../hoc/withErrorHandler';
import Spinner from '../../components/ui/Spinner';

class Orders extends Component {
	componentDidMount = () => {
		this.props.onFetchOrders(this.props.idToken);
	}

	render() {
		let orders = <Spinner />;
		if (!this.props.loading) {
			orders = this.props.orders.map(order => (
				<Order
					key={order.id}
					ingredients={order.ingredients}
					totalPrice={order.totalPrice.toFixed(2)} />
			))
		};
		return (
			<div>{ orders }</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		orders: state.order.orders,
		loading: state.order.loading,
		idToken: state.auth.idToken
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onFetchOrders: idToken => dispatch(actions.fetchOrders(idToken))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
