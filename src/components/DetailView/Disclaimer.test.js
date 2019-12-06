/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Disclaimer from './Disclaimer';

Enzyme.configure({ adapter: new Adapter() });

describe('Disclaimer component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Disclaimer />);
  });
  test('Check if Disclaimer component renders correctly', () => {
    const text = `The test results displayed on this page and the corresponding test definitions
  have been compiled with the greatest of care. We cannot, however, accept any responsibility for the correctness,
  completeness and up-to-dateness of the results.`;
    const label = wrapper.find('h3');
    expect(label).toHaveLength(1);
    expect(label.text()).toEqual('Disclaimer');
    expect(wrapper.find('.tab-content')).toHaveLength(1);
    const p = wrapper.find('p');
    expect(p.text()).toEqual(text);
  });
});
