import React, { Component } from 'react';
import styles from './layout.module.css';
import Toolbar from '../../../components/navigation/Toolbar';
import SideDrawer from '../../../components/navigation/SideDrawer';

class Layout extends Component {
	state = {
		showSideDrawer: false
	}

	sideDrawerCloseHandler = ()=> {
		this.setState({showSideDrawer: false});
	}

	sideDrawerToggleHandler = ()=> {
		this.setState(prevState => {
			return {showSideDrawer: !prevState.showSideDrawer}
		});
	}

	render() {
		return <>
			<Toolbar drawerToggleClicked={this.sideDrawerToggleHandler} />
			<SideDrawer open={this.state.showSideDrawer}
				close={this.sideDrawerCloseHandler}/>
			<main className={styles.content}>
				{this.props.children}
			</main>
		</>;
	}
}

export default Layout;
