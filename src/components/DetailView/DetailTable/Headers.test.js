/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Headers from './Headers';

Enzyme.configure({ adapter: new Adapter() });

describe('The Detail Table Cell Text component', () => {
  const render = (browsers) => {
    return shallow(<Headers browsers={browsers} />);
  };

  test('should render with 4 browsers', () => {
    const wrapper = render(['Firefox', 'Chrome', 'Brave', 'Foo']);

    expect(wrapper.find('th')).toHaveLength(4);

    const ff = wrapper.find('tr').childAt(0);
    expect(ff.text()).toEqual('Firefox');
    expect(
      ff.find('th').filterWhere((item) => {
        return item.prop('width') === '25%';
      })
    ).toHaveLength(1);
  });

  test('should render with 1 browser', () => {
    const wrapper = render(['Firefox']);

    expect(wrapper.find('th')).toHaveLength(1);

    const ff = wrapper.find('tr').childAt(0);
    expect(ff.text()).toEqual('Firefox');
    expect(
      ff.find('th').filterWhere((item) => {
        return item.prop('width') === '100%';
      })
    ).toHaveLength(1);
  });

  test('should render with 0 browsers', () => {
    const wrapper = render([]);

    expect(wrapper.find('th')).toHaveLength(0);
  });
});
