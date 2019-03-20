import React from 'react';
import styles from './toolbar.module.css';
import logo from '../../../assets/images/logo.svg';
import Menu from '../Menu';
import DrawerToggle from '../SideDrawer/DrawerToggle';

const toolbar = props => {
	return (
		<header className={styles.Toolbar}>
			<DrawerToggle clicked={props.drawerToggleClicked} />
			<div>
				<img src={logo} className={styles.logo} alt="logo" />
			</div>
			<nav className={styles.DesktopOnly}>
				<Menu isAuth={props.isAuth} />
			</nav>
		</header>
	);
};

export default toolbar;
