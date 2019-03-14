import React, { Component } from 'react';
import Button from '../../../components/ui/Button';
import Spinner from '../../../components/ui/Spinner';
import styles from './contact-data.module.css';
import axios from '../../../axios-order';
import Input from '../../../components/ui/Input';

export default class ContactData extends Component {
	// validationErrors = {
	// 	requiredError: 'Please enter a value.'
	// }
	state = {
		orderForm: {
			name: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Name'
				},
				value: '',
				validation: {
					required: true
				},
				isValid: false,
				touched: false
			},
			address: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Address'
				},
				value: '',
				validation: {
					required: true
				},
				isValid: false,
				touched: false
			},
			zipCode: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Zip code'
				},
				value: '',
				validation: {
					required: true,
					minLength: 5
				},
				isValid: false,
				touched: false
			},
			country: {
				elementType: 'input',
				elementConfig: {
					type: 'text',
					placeholder: 'Country'
				},
				value: 'USA',
				validation: {
					required: true
				},
				isValid: false,
				touched: false
			},
			email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Email address'
				},
				value: '',
				validation: {
					required: true
				},
				isValid: false,
				touched: false
			},
			deliveryMethod: {
				elementType: 'select',
				elementConfig: {
					options: [
						{ value: 'fastest', displayValue: 'Fastest' },
						{ value: 'cheapest', displayValue: 'Cheapest' }
					]
				},
				value: 'cheapest',
				validation: {},
				isValid: true,
			},
		},
		formIsValid: false,
		loading: false
	}

	checkValidity = (value, rules) => {
		if (!rules) return true;
		let isValid = true;
		if (rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		if (rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		return isValid;
	}

	orderHandler = evt => {
		evt.preventDefault();
		this.setState({ loading: true });
		const orderData = Object.keys(this.state.orderForm).reduce((obj, elemKey) => {
			obj[elemKey] = this.state.orderForm[elemKey].value;
			return obj;
		}, {})

		// should use prices stored on server to calc totalPrice
		const order = {
			ingredients: this.props.ingredients,
			price: this.props.price,
			orderData
		}
		axios.post('/orders.json', order)
			.then(resp => {
				this.setState({ loading: false });
				this.props.history.push('/');
			})
			.catch(err => {
				this.setState({ loading: false })
			});
	}

	inputChangedHandler = (evt, inputId) => {
		const orderForm = { ...this.state.orderForm };
		const updatedFormElem = { ...orderForm[inputId] };
		updatedFormElem.value = evt.target.value;
		updatedFormElem.isValid = this.checkValidity(updatedFormElem.value, updatedFormElem.validation);
		updatedFormElem.touched = true;
		orderForm[inputId] = updatedFormElem;

		const formIsValid = Object.keys(orderForm).every(key => {
			return orderForm[key].isValid;
		})

		this.setState({ orderForm, formIsValid });
	}

	render() {
		const formElemArray = Object.keys(this.state.orderForm).map(key => {
			return {
				id: key,
				config: this.state.orderForm[key]
			}
		});
		let form = (
			<form onSubmit={this.orderHandler}>
				{formElemArray.map(elem => (
					<Input
						key={elem.id}
						elementType={elem.config.elementType}
						elementConfig={elem.config.elementConfig}
						value={elem.config.value}
						isValid={elem.config.isValid}
						shouldValidate={elem.config.validation}
						touched={elem.config.touched}
						changed={(evt) => this.inputChangedHandler(evt, elem.id)} />
				))}
				<Button
					buttonType="Success"
					disabled={!this.state.formIsValid}>ORDER</Button>
			</form>
		);
		if (this.state.loading) form = <Spinner />;
		return (
			<div className={styles.ContactData}>
				<h4>Enter contact info</h4>
				{form}
			</div>
		)
	}
}
