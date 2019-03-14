import React from 'react';
import styles from './burger.module.css';
import BurgerIngredient from './BurgerIngredient';
// import { withRouter } from 'react-router-dom';

const burger = props => {
	let ingredients = Object.keys(props.ingredients)
		.map(ingredient => {
			return [...Array(props.ingredients[ingredient])].map((_, idx) => {
				return <BurgerIngredient key={ingredient + idx} type={ingredient} />
			});
		})
		.reduce((arr, el) => {
			return arr.concat(el);
		}, [])
	if(ingredients.length === 0) {
		ingredients = <p>Please add ingredients!</p>
	}
	return (
		<div className={styles.Burger}>
			<BurgerIngredient type="bread-top" />
			{ingredients}
			<BurgerIngredient type="bread-bottom" />
		</div>
	);
};

export default burger;
