import React, { Component } from 'react';
import Burger from '../../components/Burger';
import BuildControls from '../../components/Burger/BuildControls';
import Modal from '../../components/ui/Modal';
import OrderSummary from '../../components/Burger/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/ui/Spinner';
import withErrorHandler from '../hoc/withErrorHandler';

const INGREDIENTS_PRICES = {
	lettuce: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	state = {
		ingredients: null,
		totalPrice: 4,
		purchasable: false,
		purchasing: false,
		loading: false,
		error: false
	}

	componentDidMount() {
		// console.log(this.props)
		axios.get('https://burger-builder-6d2ad.firebaseio.com/ingredients.json')
			.then(resp => {
				this.setState({ ingredients: resp.data })
			})
			.catch(err => {
				this.setState({ error: true })
			})
	}


	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map((ingKey) => {
				return ingredients[ingKey]
			})
			.reduce((sum, elPrice) => {
				return sum + elPrice
			}, 0);
		this.setState({ purchasable: sum > 0 })
	}

	addIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENTS_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	removeIngredientHandler = type => {
		const oldCount = this.state.ingredients[type];
		if (oldCount <= 0) return;
		const updatedCount = oldCount - 1;
		const updatedIngredients = {
			...this.state.ingredients
		}
		updatedIngredients[type] = updatedCount;
		const priceDeduction = INGREDIENTS_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - priceDeduction;
		this.setState({
			totalPrice: newPrice,
			ingredients: updatedIngredients
		});
		this.updatePurchaseState(updatedIngredients);
	}

	purchaseHandler = () => {
		this.setState({ purchasing: true })
	}

	purchaseCancelHandler = () => {
		this.setState({ purchasing: false })
	}

	purchaseContinueHandler = () => {
		const queryParams = [];
		for (let i in this.state.ingredients) {
			queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
		}
		queryParams.push('price=' + this.state.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
			pathname: '/checkout',
			search: '?' + queryString
		});
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}
		for (let key in disabledInfo) {
			disabledInfo[key] = disabledInfo[key] <= 0
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>Can't load ingredients.</p> : <Spinner />;
		if (this.state.ingredients) {
			burger = (
				<>
					<Burger ingredients={this.state.ingredients} />
					<BuildControls
						ingredientAdded={this.addIngredientHandler}
						ingredientRemoved={this.removeIngredientHandler}
						disabled={disabledInfo}
						purchasable={this.state.purchasable}
						makeOrder={this.purchaseHandler}
						price={this.state.totalPrice}
					/>
				</>
			);
			orderSummary = <OrderSummary
				ingredients={this.state.ingredients}
				price={this.state.totalPrice}
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

export default withErrorHandler(BurgerBuilder, axios);
