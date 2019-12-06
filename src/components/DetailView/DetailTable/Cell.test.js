/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailTableCell from './Cell';

Enzyme.configure({ adapter: new Adapter() });

describe('Detail Table Cell component', () => {
  const render = ({ testResult }) => {
    return shallow(<DetailTableCell testResult={testResult} />);
  };

  test('should render empty is no result', () => {
    const wrapper = render({});

    expect(wrapper.find('.ans-1')).toHaveLength(0);
    expect(wrapper.find('.ans-default')).toHaveLength(0);
  });

  test('should choose the correct answer number', () => {
    const testResult = { result: 1 };
    const wrapper = render({ testResult });

    expect(wrapper.find('.ans-1')).toHaveLength(1);
    expect(wrapper.find('.ans-default')).toHaveLength(0);
  });

  test('should choose the default answer number', () => {
    const testResult = { result: 999 };
    const wrapper = render({ testResult });

    expect(wrapper.find('.ans-1')).toHaveLength(0);
    expect(wrapper.find('.ans-default')).toHaveLength(1);
  });
});
