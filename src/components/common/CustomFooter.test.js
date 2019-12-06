/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import CustomFooter from './CustomFooter';

Enzyme.configure({ adapter: new Adapter() });

describe('footer testing', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CustomFooter />);
  });
  test('renders with full item', () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
    expect(wrapper.find(Navbar.Collapse)).toHaveLength(1);
    expect(wrapper.find(Nav)).toHaveLength(1);
    expect(wrapper.find(NavItem)).toHaveLength(2);
    expect(wrapper.find(Link)).toHaveLength(2);
    expect(wrapper.find(Navbar.Brand)).toHaveLength(1);
    expect(wrapper.find('a')).toHaveLength(1);
    expect(wrapper.find('a').prop('href')).toEqual('https://www.mgm-sp.com');
    expect(wrapper.find(Image)).toHaveLength(1);
  });
});
