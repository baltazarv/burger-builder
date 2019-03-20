import React, { Component } from 'react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import styles from './auth.module.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';
import { checkValidity } from '../../shared/utility';

class Auth extends Component {
	state = {
		controls: {
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email Address'
				},
				value: '',
				validation: {
					required: true,
					isEmail: true
				},
				isValid: false,
				touched: false
			},
			password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Password'
				},
				value: '',
				validation: {
					required: true,
					minLength: 6
				},
				isValid: false,
				touched: false
			}
		},
		isSignedUp: true
	}

	componentDidMount = () => {
		if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
			this.props.onSetAuthRedirectPath();
		}
	}

	inputChangedHandler = (evt, controlName) => {
		const controls = {
			...this.state.controls,
			[controlName]: {
				...this.state.controls[controlName],
				value: evt.target.value,
				isValid: checkValidity(evt.target.value, this.state.controls[controlName].validation),
				touched: true
			}
		};
		this.setState({ controls });
	}

	submitHandler = evt => {
		evt.preventDefault();
		this.props.onAuth(
			this.state.controls.email.value, this.state.controls.password.value,
			this.state.isSignedUp
		);
	}

	switchAuthModeHandler = () => {
		this.setState(prevState => {
			return {
				isSignedUp: !prevState.isSignedUp
			}
		})
	}

	render() {
		const formElemArray = Object.keys(this.state.controls).map(key => {
			return {
				id: key,
				config: this.state.controls[key]
			}
		});

		let form = formElemArray.map((elem, id) => (
			<Input
				key={id}
				elementType={elem.config.elementType}
				elementConfig={elem.config.elementConfig}
				value={elem.config.value}
				isValid={elem.config.isValid}
				shouldValidate={elem.config.validation}
				touched={elem.config.touched}
				changed={(evt) => this.inputChangedHandler(evt, elem.id)} />
		));

		if (this.props.loading) {
			form = <Spinner />
		};

		let errorMessage = null;
		if (this.props.error) {
			errorMessage = (
				<p>{this.props.error.message}</p>
			);
		}

		let authRedirect = null
		if (this.props.isAuth) {
			authRedirect = <Redirect to={this.props.authRedirectPath} />
		}

		return (
			<div className={styles.Auth}>
				{authRedirect}
				{errorMessage}
				<form onSubmit={this.submitHandler}>
					{form}
					<Button buttonType="Success">SUBMIT</Button>
				</form>
				<Button
					clicked={this.switchAuthModeHandler}
					buttonType="Danger">{this.state.isSignedUp ? "SIGN IN" : "SIGN UP"}</Button>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		loading: state.auth.loading,
		error: state.auth.error,
		isAuth: state.auth.idToken !== null,
		buildingBurger: state.burgerBuilder.buildingBurger,
		authRedirectPath: state.auth.authRedirectPath
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onAuth: (email, pwd, isSignedUp) => dispatch(actions.auth(email, pwd, isSignedUp)),
		onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
	}

}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
