import React from 'react';
import logo from '../../../assets/images/logo.svg';
import Menu from '../Menu';
import styles from './side-drawer.module.css';
import Backdrop from '../../ui/Backdrop';

const sideDrawer = props => {
	let attachedStyles = [styles.SideDrawer, styles.Close];
	if (props.open) {
		attachedStyles = [styles.SideDrawer, styles.Open]
	}
	return (
		<>
			<Backdrop show={props.open} clicked={props.close} />
			<div className={attachedStyles.join(' ')}>
				<img src={logo} className={styles.logo} alt="logo" />
				<nav>
					<Menu />
				</nav>
			</div>
		</>
	);
};

export default sideDrawer;
