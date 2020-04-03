/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Testcase from './Testcase';

const THE_TESTCASE = {
  title: 'TEST TITLE TEST',
  tags: [
    {
      _id: '5ca5bb8b2e372d7c12d93a02',
      tagNumber: 1,
      tagText: 'CSP',
    },
    {
      _id: '5ca5bb8b2e372d7c12d93a04',
      tagNumber: 3,
      tagText: 'X-Frame-Options',
    },
  ],
  description: 'TEST DESCRIPTION',
  testNumber: 99,
  path: 'test-description',
};

Enzyme.configure({ adapter: new Adapter() });

describe('Testcase with defined props', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Testcase {...THE_TESTCASE} />);
  });
  test('check if Testcase is rendered correctly with link, CSS and if it assigns props to Tags correctly', () => {
    expect(wrapper.find('Link').props().className).toEqual('link');
    expect(wrapper.find('Link').props().to).toEqual('/test-description');
    expect(wrapper.find('h2').text()).toContain('TEST TITLE');
    expect(wrapper.find('p').text()).toContain('TEST DESCRIPTION');
    expect(wrapper.find('_default').props().tags).toEqual(THE_TESTCASE.tags);
  });
});
