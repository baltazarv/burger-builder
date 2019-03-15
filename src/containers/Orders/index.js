import React, { Component } from 'react';
import Order from '../../components/Order';
import axios from '../../axios-order';
import withErrorHandler from '../hoc/withErrorHandler';

class Orders extends Component {
	state= {
		orders: [],
		loading: true
	}
	componentDidMount = () => {
		axios.get('/orders.json')
			.then(resp => {
				const orders = Object.entries(resp.data).map(order => {
					return {...order[1], id: order[0]}
				});
				// console.log('fetchedOrders', orders)
				this.setState({ loading: false, orders })
			})
			.catch(err => {
				this.setState({loading: false})
			})
	}

	render() {
		return (
			<div>
				{this.state.orders.map(order => (
					 <Order
						key={order.id}
						ingredients={order.ingredients}
						totalPrice={order.totalPrice.toFixed(2)} />
				))}
			</div>
		)
	}
}

export default withErrorHandler(Orders, axios);
