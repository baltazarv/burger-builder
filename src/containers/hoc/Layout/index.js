import React, { Component } from 'react';
import styles from './layout.module.css';
import Toolbar from '../../../components/navigation/Toolbar';
import SideDrawer from '../../../components/navigation/SideDrawer';
import { connect } from 'react-redux';

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerCloseHandler = () => {
		this.setState({ showSideDrawer: false });
	}

	sideDrawerToggleHandler = () => {
		this.setState(prevState => {
			return { showSideDrawer: !prevState.showSideDrawer }
		});
	}

	render() {
		return <>
			<Toolbar
				drawerToggleClicked={this.sideDrawerToggleHandler}
				isAuth={this.props.isAuth}
			/>
			<SideDrawer
				open={this.state.showSideDrawer}
				close={this.sideDrawerCloseHandler}
				isAuth={this.props.isAuth}
			/>
			<main className={styles.content}>
				{this.props.children}
			</main>
		</>;
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.idToken !== null
	}
};

export default connect(mapStateToProps)(Layout);
