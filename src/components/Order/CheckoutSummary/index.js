import React from 'react';
import styles from './checkout-summary.module.css';
import Burger from '../../Burger';
import Button from '../../ui/Button';

const checkoutSummary = props => {
	return (
		<div className={styles.CheckoutSummary}>
			<h1>We hope it's tasty!</h1>
			<div className={styles.burger}>
				<Burger ingredients={props.ingredients} />
				<p>Your total will be: <strong>${props.totalPrice.toFixed(2)}</strong></p>
			</div>
			<Button
				buttonType="Danger"
				clicked={props.checkoutCancel}>CANCEL</Button>
			<Button
				buttonType="Success"
				clicked={props.checkoutContinue}>CONTINUE</Button>
		</div>
	);
};

export default checkoutSummary;
