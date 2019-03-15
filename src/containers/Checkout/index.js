import React, { Component } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "./ContactData";
import * as burgerActions from '../../store/actions/index';
import { connect } from 'react-redux';

class Checkout extends Component {
	componentWillMount = () => {
		const query = new URLSearchParams(this.props.location.search);
		const ingredients = {};
		for (let param of query.entries()) {
			ingredients[param[0]] = +param[1];
		}
		this.props.addIngredients(ingredients);
	}

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		return (
			<div>
				<CheckoutSummary
					ingredients={this.props.ingredients}
					checkoutCancel={this.checkoutCancelHandler}
					checkoutContinue={this.checkoutContinueHandler}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					component={ContactData} />
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.ingredients,
		totalPrice: state.totalPrice
	}
};

const mapDispatchToProps = dispatch => {
	return {
		addIngredients: ingredients => dispatch(burgerActions.addIngredients(ingredients))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
