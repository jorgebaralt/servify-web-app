import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItem from './NagivationItem/NagivationItem';
import NagivationItems from './NavigationItems';

configure({adapter: new Adapter()});

describe('<Navigation Items />', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = shallow(<NagivationItems />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.find(NavigationItem)).tohaveLength(2);
    });

    it('should render three <NavigationItem /> elements if authenticated', () => {
        wrapper.setProps({isAuthenticated: true});
        expect(wrapper.find(NavigationItem)).tohaveLength(3);
    });

    it('should render exactly <NavigationItem link="/logout/> element if authenticated', () => {
        expect(wrapper.contains(<NavigationItem link="/logout" isAuthenticated>Sign Out</NavigationItem>)).equal(true);
    });
});