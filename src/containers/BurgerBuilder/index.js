import React, { Component } from 'react';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/ui/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/ui/Spinner';
import withErrorHandler from '../hoc/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
	state = {
		purchasing: false
	}

	componentDidMount = () => {
		if (!this.props.buildingBurger) this.props.getIngredients();
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
		if (this.props.isAuth) {
			this.setState({ purchasing: true })
		} else {
			this.props.onSetAuthRedirectPath('/checkout');
			this.props.history.push('/auth');
		}
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		// const queryParams = [];
		// for (let i in this.props.ingredients) {
		// 	queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.props.ingredients[i]))
		// }
		// const queryString = queryParams.join('&');
		this.props.onInitPurchase();
		// this.props.history.push({
		// 	pathname: '/checkout',
		// 	search: '?' + queryString
		// });
		this.props.history.push('/checkout');
	}

	render() {
		const disabledInfo = {
			...this.props.ingredients
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;
		let burger = this.props.error ? <p>Can't load ingredients.</p> : <Spinner />;
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
						isAuth={this.props.isAuth}
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
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		error: state.burgerBuilder.error,
		isAuth: state.auth.idToken !== null,
		buildingBurger: state.burgerBuilder.buildingBurger
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addIngredient: ingredient => dispatch(actions.addIngredient(ingredient)),
		removeIngredient: ingredient => dispatch(actions.removeIngredient(ingredient)),
		getIngredients: () => dispatch(actions.getIngredients()),
		onInitPurchase: () => dispatch(actions.purchaseInit()),
		onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
