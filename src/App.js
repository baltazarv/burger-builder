import React, { Component } from 'react';
import Layout from './containers/hoc/Layout'
import BurgerBuilder from './containers/BurgerBuilder'
import Orders from './containers/Orders';
/* support for CSS modules with react-scripts@2.0.0 and higher:
  https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet */
import styles from './App.module.css';
import Checkout from './containers/Checkout';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth';
import Logout from './containers/Auth/Logout';


class App extends Component {
	render() {
		return (
			<div className={styles.App}>
				<Layout>
					<Switch>
						<Route path='/checkout' component={Checkout} />
						<Route path='/orders' component={Orders} />
						<Route path='/auth' component={Auth} />
						<Route path='/logout' component={Logout} />
						<Route path='/' exact component={BurgerBuilder} />
					</Switch>
				</Layout>
			</div>
		);
	}
}

export default App;
