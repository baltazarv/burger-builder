import React from 'react';
import styles from './button.module.css';

const button = props => {
	return (
		<button
			disabled={props.disabled}
			className={[styles.Button, styles[props.buttonType]].join(' ')}
			onClick={props.clicked}
		>
			{props.children}
		</button>
	);
};

export default button;
