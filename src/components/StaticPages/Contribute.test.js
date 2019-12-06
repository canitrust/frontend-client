/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Contribute from './Contribute';
import Env from '../../configuration';

Enzyme.configure({ adapter: new Adapter() });

describe('Contribute with defined props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Contribute />);
  });
  test('Check if Contribute component renders and passs props to StaticPage correctly', () => {
    expect(wrapper.find('div')).toHaveLength(1);
    const staticpage = wrapper.find('StaticPage');
    expect(staticpage).toHaveLength(1);
    expect(staticpage.props().page).toEqual('contribute');
    expect(staticpage.props().localContent).toEqual('CONTRIBUTE PAGE');
    expect(staticpage.props().env).toEqual(Env.Node);
  });
});
