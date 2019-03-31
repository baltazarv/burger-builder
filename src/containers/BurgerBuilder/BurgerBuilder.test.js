import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import { BurgerBuilder } from './index';
import BuildControls from '../../components/Burger/BuildControls';

// connect enzyme
configure({adapter: new Adapter()});

describe('<BurgerBuilder />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<BurgerBuilder getIngredients={() => {}} />);
	});

	it('should render <BuildControls /> when receiving ingredients', () => {
		wrapper.setProps({ ingredients: {salad: 0 } });
		expect(wrapper.find(BuildControls)).toHaveLength(1);
	});
});
