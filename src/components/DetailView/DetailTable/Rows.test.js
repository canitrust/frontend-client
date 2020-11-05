/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailTableRows from './Rows';

Enzyme.configure({ adapter: new Adapter() });

describe('The DetailTable Rows component', () => {
  const render = (props) => {
    return mount(
      <table>
        <tbody>
          <DetailTableRows {...props} />
        </tbody>
      </table>
    );
  };

  test('should rendered correctly', () => {
    const props = {
      tableBody: [
        {
          browser: 'Chrome',
          column: [
            {
              _id: 123,
              result: 1,
              browserVerRange: {
                from: 55,
                to: 68,
              },
              isBeta: false,
            },
            {
              _id: 124,
              result: 0,
              browserVerRange: {
                from: 69,
                to: 69,
              },
              isBeta: false,
            },
            null,
          ],
          stableIndex: 69,
        },
        {
          browser: 'Firefox',
          column: [
            {
              _id: 125,
              result: 2,
              browserVerRange: {
                from: 21,
                to: 21,
              },
              isBeta: false,
            },
            {
              _id: 126,
              result: 3,
              browserVerRange: {
                from: 22,
                to: 22,
              },
              isBeta: false,
            },
            {
              _id: 127,
              result: 4,
              browserVerRange: {
                from: 23,
                to: 23,
              },
              isBeta: true,
            },
          ],
          stableIndex: 22,
        },
      ],
      largestStableIndex: 1,
    };
    const wrapper = render(props);

    expect(wrapper.find('tr').length).toBe(3);
    expect(wrapper.find('td').length).toBe(6);
    expect(wrapper.find('.latest').length).toBe(1);

    expect(wrapper.find('.ans-0').text()).toEqual('69');
    expect(wrapper.find('.ans-1').text()).toEqual('55-68');
    expect(wrapper.find('.ans-2').text()).toEqual('21');
    expect(wrapper.find('.ans-3').text()).toEqual('22');
    expect(wrapper.find('.ans-4').text()).toEqual('23(beta)');
  });
});
