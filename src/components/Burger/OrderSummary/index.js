import React from 'react';
// import '../../../App.module.css';
import Button from '../../ui/Button';

const orderSummary = props => {
	const ingredientSummary = Object.keys(props.ingredients)
		.map(ingredient => {
			return (<li key={ingredient} className=""><span>{ingredient}</span>: {props.ingredients[ingredient]}</li>);
		});
	return (
		<>
			<h3>Your Order</h3>
			<p>A scrumptious burger with the following custom ingredients:</p>
			<ul>
				{ingredientSummary}
			</ul>
			<p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
			<p>Continue to Checkout?</p>
			<Button buttonType="Danger" clicked={props.purchaseCancel}>CANCEL</Button>
			<Button buttonType="Success" clicked={props.purchaseContinue}>CONTINUE</Button>
		</>
	);
};

export default orderSummary;
