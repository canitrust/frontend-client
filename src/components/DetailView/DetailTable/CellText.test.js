/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import CellText from './CellText';

Enzyme.configure({ adapter: new Adapter() });

describe('The Detail Table Cell Text component', () => {
  const render = (testResult) => {
    return shallow(<CellText testResult={testResult} />);
  };

  test('should correctly display a single result', () => {
    const testResult = {
      result: 1,
      browserVerRange: {
        from: 69,
        to: 69,
      },
      isBeta: false,
    };
    const wrapper = render(testResult);

    expect(wrapper.find('span').text()).toEqual('69');
    expect(wrapper.find('.browser-beta')).toHaveLength(0);
  });

  test('should correctly display a result range', () => {
    const testResult = {
      result: 1,
      browserVerRange: {
        from: 66,
        to: 69,
      },
      isBeta: false,
    };
    const wrapper = render(testResult);

    expect(wrapper.find('span').text()).toEqual('66-69');
    expect(wrapper.find('.browser-beta')).toHaveLength(0);
  });

  test('should correctly display a single beta result', () => {
    const testResult = {
      result: 1,
      browserVerRange: {
        from: 69,
        to: 69,
      },
      isBeta: true,
    };
    const wrapper = render(testResult);

    expect(wrapper.find('span').text()).toEqual('69(beta)');
    expect(wrapper.find('.browser-beta')).toHaveLength(1);
  });

  test('should correctly display a beta result range', () => {
    const testResult = {
      result: 1,
      browserVerRange: {
        from: 66,
        to: 69,
      },
      isBeta: true,
    };
    const wrapper = render(testResult);

    expect(wrapper.find('span').text()).toEqual('66(beta)-69(beta)');
    expect(wrapper.find('.browser-beta')).toHaveLength(2);
  });
});
