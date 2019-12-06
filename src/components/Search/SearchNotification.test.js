/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchNotification from './SearchNotification';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchNotification with defined props', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      error: false,
      result: {
        searchresult: [
          {
            title: 'TEST TITLE',
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
          },
          {
            title: 'TEST TITLE2',
            tags: [
              {
                _id: '5ca5bb8b2e372d7c12d93a02',
                tagNumber: 1,
                tagText: 'CSP',
              },
            ],
            description: 'TEST DESCRIPTION2',
            testNumber: 98,
          },
        ],
      },
    };
    wrapper = shallow(<SearchNotification {...props} />);
  });
  test('renders with 2 results', () => {
    expect(wrapper.find('span').text()).toEqual('Found 2 result(s)');
  });
});
