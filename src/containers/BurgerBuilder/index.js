import React, { Component } from 'react';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/ui/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/ui/Spinner';
import withErrorHandler from '../hoc/withErrorHandler';
import { connect } from 'react-redux';
import * as burgerActions from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		// axios.get('https://burger-builder-6d2ad.firebaseio.com/ingredients.json')
		// 	.then(resp => {
		// 		this.setState({ ingredients: resp.data })
		// 	})
		// 	.catch(err => {
		// 		this.setState({ error: true })
		// 	})
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((ingKey) => {
				return ingredients[ingKey]
			})
			.reduce((sum, elPrice) => {
				return sum + elPrice
			}, 0);
		return sum > 0;
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		const queryParams = [];
		for (let i in this.props.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
		}
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}

	render() {
		const disabledInfo = {
			...this.props.ingredients
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>Can't load ingredients.</p> : <Spinner />;
		if (this.props.ingredients) {
			burger = (
				<>
					<Burger ingredients={this.props.ingredients} />
					<BuildControls
						ingredientAdded={this.props.addIngredient}
						ingredientRemoved={this.props.removeIngredient}
						disabled={disabledInfo}
						purchasable={this.updatePurchaseState(this.props.ingredients)}
						makeOrder={this.purchaseHandler}
						totalPrice={this.props.totalPrice}
					/>
				</>
			);
			orderSummary = <OrderSummary
				ingredients={this.props.ingredients}
				totalPrice={this.props.totalPrice}
				purchaseCancel={this.purchaseCancelHandler}
				purchaseContinue={this.purchaseContinueHandler}
			/>
		}
		if (this.state.loading) {
			orderSummary = <Spinner />;
		}

		return (
			<>
				<Modal
					show={this.state.purchasing}
					closeModal={this.purchaseCancelHandler}
				>
					{orderSummary}
				</Modal>
				{burger}
			</>
		)
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addIngredient: ingredient => dispatch(burgerActions.addIngredient(ingredient)),
		removeIngredient: ingredient => dispatch(burgerActions.removeIngredient(ingredient))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
