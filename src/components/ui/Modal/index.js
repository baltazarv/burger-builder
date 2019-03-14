import React, { Component } from 'react';
import styles from './modal.module.css';
import Backdrop from '../Backdrop'

class Modal extends Component {

	// render component only when it is shown or hidden
	// OrderSummary is not rendered either because it is props.children
	shouldComponentUpdate(nextProps, nextState) {
		return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
	}

	render() {
		// let classes = ['Modal'];
		// props.show ? classes.push('shown') : classes.push('hidden');
		const { props } = this;

		return (
			<>
				<Backdrop
					show={props.show}
					clicked={props.closeModal} />
				<div className={styles.Modal}
					style={{
						transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
						opacity: props.show ? '1' : '0'
					}}>
					{props.children}
				</div>
			</>
		);
	}
}

export default Modal;
