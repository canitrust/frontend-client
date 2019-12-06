/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import CustomNavbar from './CustomNavbar';

Enzyme.configure({ adapter: new Adapter() });

describe('CustomNavbar with defined props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<CustomNavbar />);
  });
  test('renders', () => {
    expect(wrapper.find(Navbar)).toHaveLength(1);
    expect(wrapper.find(Navbar.Collapse)).toHaveLength(1);
    expect(wrapper.find(Nav)).toHaveLength(1);
    expect(wrapper.find(NavItem)).toHaveLength(2);
    expect(wrapper.find(Link)).toHaveLength(2);
  });
});
