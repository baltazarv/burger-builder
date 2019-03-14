import React from 'react';
import MenuItem from './MenuItem'
import styles from './menu.module.css';

const Menu = () => {
	return (
		<ul className={styles.Menu}>
			<MenuItem link="/" exact>Burger Builder</MenuItem>
			<MenuItem link="/orders">Orders</MenuItem>
		</ul>
	);
};

export default Menu;
