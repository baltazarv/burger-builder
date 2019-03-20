import React, { Component, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import styles from './App.module.css';
/* support for CSS modules with react-scripts@2.0.0 and higher:
  https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet */
import Layout from './containers/hoc/Layout'
import BurgerBuilder from './containers/BurgerBuilder'
import Logout from './containers/Auth/Logout';
// import Auth from './containers/Auth';
// import Orders from './containers/Orders';
// import Checkout from './containers/Checkout';
import AsyncComponent from './containers/hoc/asyncComponent';
import Spinner from './components/ui/Spinner';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

// custom lazy-loading component before React 16.6
const asyncCheckout = AsyncComponent(() => {
	return import('./containers/Checkout')
})

const asyncOrders = AsyncComponent(() => {
	return import('./containers/Orders')
})

const asyncAuth = AsyncComponent(() => {
	return import('./containers/Auth')
})

// native lazy loading, 16.6+
// const Auth = React.lazy(() => {
// 	return import('./containers/Auth')
// })

class App extends Component {
	componentDidMount = () => {
		this.props.authCheckState();
	}

	render() {
		let routes = (
			<Switch>
					<Route path='/auth' component={asyncAuth} />
				{/* <Route path='/auth' render={() => <Auth />} /> */}
				<Route path='/' exact component={BurgerBuilder} />
				<Redirect to="/" />
			</Switch>
		);

		if (this.props.isAuth) {
			routes = (
				<Switch>
					<Route path='/checkout' component={asyncCheckout} />
					<Route path='/orders' component={asyncOrders} />
					<Route path='/logout' component={Logout} />
					<Route path='/auth' component={asyncAuth} />
					{/* <Route path='/auth' render={() => <Auth />} /> */}
					<Route path='/' exact component={BurgerBuilder} />
					<Redirect to="/" />
				</Switch>
			)
		}

		return (
			<div className={styles.App}>
				<Layout>
					<Suspense fallback={Spinner}>
						{routes}
					</Suspense>
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
