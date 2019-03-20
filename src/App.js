import React, { Component } from 'react';
import Layout from './containers/hoc/Layout'
import BurgerBuilder from './containers/BurgerBuilder'
import Orders from './containers/Orders';
/* support for CSS modules with react-scripts@2.0.0 and higher:
  https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet */
import styles from './App.module.css';
import Checkout from './containers/Checkout';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './containers/Auth';
import Logout from './containers/Auth/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';


class App extends Component {
	componentDidMount = () => {
		this.props.authCheckState();
	}

	render() {
		console.log('isauth', this.props.isAuth)
		let routes = (
			<Switch>
				<Route path='/auth' component={Auth} />
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route path='/checkout' component={Checkout} />
					<Route path='/orders' component={Orders} />
					<Route path='/logout' component={Logout} />
					<Route path='/' exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			)
		}

		return (
			<div className={styles.App}>
				<Layout>
					{routes}
				</Layout>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		isAuth: state.auth.idToken !== null
	}
}

const mapDispatchToProps = dispatch => {
	return {
		authCheckState: () => dispatch(actions.authCheckState())
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
