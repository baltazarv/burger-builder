import React from 'react';
import MenuItem from './MenuItem'
import styles from './menu.module.css';

const Menu = props => {
	return (
		<ul className={styles.Menu}>
			<MenuItem link="/" exact>Burger Builder</MenuItem>
			{props.isAuth
				? <MenuItem link="/orders">Orders</MenuItem>
				: null}
			{props.isAuth
				? <MenuItem link="/logout">Log Out</MenuItem>
				: <MenuItem link="/auth">Login</MenuItem>}
		</ul>
	);
};

export default Menu;
