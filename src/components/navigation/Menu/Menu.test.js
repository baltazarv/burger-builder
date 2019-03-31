import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react'
import Menu from './index';
import MenuItem from './MenuItem';

// connect enzyme
configure({adapter: new Adapter()})

describe('<Menu />', () => {
	let wrapper;

	beforeEach(() => {
		wrapper = shallow(<Menu />);
	});

	it('should render two <MenuItem /> elements if not authenticated.', ()=> {
		expect(wrapper.find(MenuItem)).toHaveLength(2);
	});

	it('should render three <MenuItem /> elements if authenticated.', ()=> {
		wrapper.setProps({ isAuth: true })
		expect(wrapper.find(MenuItem)).toHaveLength(3);
	});

	it('should render an exact logout button if authenticated.', ()=> {
		wrapper.setProps({ isAuth: true })
		expect(wrapper.contains(<MenuItem link="/logout">Log Out</MenuItem>)).toEqual(true);
	});

});
