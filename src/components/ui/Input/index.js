import React from 'react';
import styles from './input.module.css';

const input = props => {
	let inputElement = null;
	const classes = [styles.inputElement];

	if(!props.isValid && props.shouldValidate && props.touched) {
		classes.push(styles.invalid);
	}

	switch (props.elementType) {
		case ('input'):
			inputElement = <input
				className={classes.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed} />
			break;
		case ('textarea'):
			inputElement = <texarea
				className={classes.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed} />
			break;
		case ('select'):
			inputElement = <select
				className={classes.join(' ')}
				value={props.value}
				onChange={props.changed}>
				{props.elementConfig.options.map(option => (
					<option
						key={option.value}
						value={option.value}>
						{option.displayValue}
					</option>
				))}}
			</select>
			break;
		default:
			inputElement = <input
				className={classes.join(' ')}
				{...props.elementConfig}
				value={props.value}
				onChange={props.changed} />
	}
	return (
		<div className={styles.Input}>
			<label className={styles.label}>{props.label}</label>
			{inputElement}
		</div>
	);
};

export default input;
