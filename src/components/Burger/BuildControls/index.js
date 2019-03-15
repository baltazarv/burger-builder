import React from 'react';
import styles from './build-controls.module.css';
import BuildControl from './BuildControl';
import { connect } from 'react-redux';

const controls = [
	{ label: 'Bacon', type: 'bacon' },
	{ label: 'Lettuce', type: 'lettuce' },
	{ label: 'Cheese', type: 'cheese' },
	{ label: 'Meat', type: 'meat' },
];

const buildControls = props => (
	<div className={styles.BuildControls}>
		<p>Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
		{controls.map((control) => (
			<BuildControl
				key={control.label}
				label={control.label}
				added={() => props.ingredientAdded(control.type)}
				removed={() => props.ingredientRemoved(control.type)}
				disabled={props.disabled[control.type]}
			/>
		))}
		<button
			className={styles.OrderButton}
			disabled={!props.purchasable}
			onClick={props.makeOrder}>ORDER NOW</button>
	</div>
);

const mapStateToProps = state => {
	return {
		totalPrice: state.totalPrice
	}
}

export default connect(mapStateToProps)(buildControls);
