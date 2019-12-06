/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchResult from './SearchResult';
import Testcases from '../common/Testcases';

Enzyme.configure({ adapter: new Adapter() });

describe('SearchResult with defined props', () => {
  let wrapper;
  const testCaseArray = [
    {
      title: 'TEST TITLE',
      tags: ['tag1', 'tag2'],
      description: 'TEST DESCRIPTION',
      testNumber: 99,
    },
    {
      title: 'TEST TITLE2',
      tags: ['tag2', 'tag3'],
      description: 'TEST DESCRIPTION2',
      testNumber: 98,
    },
  ];
  beforeEach(() => {
    const props = { result: { searchresult: testCaseArray } };
    wrapper = shallow(<SearchResult {...props} />, {
      disableLifecycleMethods: true,
    });
  });
  test('renders', () => {
    expect(wrapper.find(Testcases).prop('testcases')).toHaveLength(2);
  });
});
