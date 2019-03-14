import React, { Component } from 'react';
import Modal from '../../../components/ui/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
	return class extends Component {
		constructor(props) {
			super(props);
			this.state = {
				error: null
			}
			// interceptors do not cause side-effects
			this.reqInterceptor = axios.interceptors.request.use(req => {
				this.setState({ error: null });
				return req;
			})
			this.respInterceptor = axios.interceptors.response.use(resp => resp, error => {
				this.setState({ error })
			})
		}

		errorConfirmedHandler = () => {
			this.setState({ error: null })
		}

		componentWillUnmount() {
			// test interceptors being ejected
			axios.interceptors.request.eject(this.reqInterceptor);
			axios.interceptors.response.eject(this.respInterceptor);
		}

		render() {
			return (
				<>
					<Modal
						show={this.state.error}
						closeModal={this.errorConfirmedHandler}
					>
						{this.state.error ? this.state.error.message : null}
					</Modal>
					<WrappedComponent {...this.props} />
				</>
			)
		}
	}
};

export default withErrorHandler;
