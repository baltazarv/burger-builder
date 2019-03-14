import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './menu-item.module.css';

const menuItem = props => {
	return (
		<li className={styles.MenuItem}>
			<NavLink
				to={props.link}
				exact={props.exact}
				activeClassName={styles.active}
			>{props.children}</NavLink>
		</li>
	);
};

export default menuItem;
