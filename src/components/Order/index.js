import React from 'react';
import styles from './order.module.css';

const Order = props => {
	return (
		<div className={styles.Order}>
			Ingredients: {Object.entries(props.ingredients).map(ing => (
				<span className={styles.ingredient}
					key={ing[0]}>
					{ing[0]} ({ing[1]})
				</span>
			))}
			<p>Price: <strong>${props.totalPrice}</strong></p>
		</div>
	);
};

export default Order;
