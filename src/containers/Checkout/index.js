import React, { Component } from 'react';
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "./ContactData";
import { connect } from 'react-redux';

class Checkout extends Component {

	componentWillMount = () => {
		// const query = new URLSearchParams(this.props.location.search);
		// const ingredients = {};
		// for (let param of query.entries()) {
		// 	ingredients[param[0]] = +param[1];
		// }
		// this.props.setIngredients(ingredients);
	}

	checkoutCancelHandler = () => {
		this.props.history.goBack();
	}

	checkoutContinueHandler = () => {
		this.props.history.replace('/checkout/contact-data');
	}

	render() {
		let summary = <Redirect to="/" />
		if (this.props.ingredients) {
			const purchaseRedirect = this.props.purchased ? <Redirect to='/' /> : null;
			summary = (
			<div>
				{purchaseRedirect}
				<CheckoutSummary
					ingredients={this.props.ingredients}
					checkoutCancel={this.checkoutCancelHandler}
					checkoutContinue={this.checkoutContinueHandler}
					totalPrice={this.props.totalPrice}
				/>
				<Route
					path={this.props.match.path + '/contact-data'}
					component={ContactData} />
			</div>
			);
		}
		return summary;
	}
}

const mapStateToProps = state => {
	return {
		ingredients: state.burgerBuilder.ingredients,
		totalPrice: state.burgerBuilder.totalPrice,
		purchased: state.order.purchased
	}
};

export default connect(mapStateToProps)(Checkout);
