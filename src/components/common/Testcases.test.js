/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Testcases from './Testcases';
import Testcase from './Testcase';

Enzyme.configure({ adapter: new Adapter() });

describe('Testcases with defined props', () => {
  let wrapper;
  const testCaseArray = [
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
  ];
  beforeEach(() => {
    const props = {
      testcases: testCaseArray,
    };
    wrapper = shallow(<Testcases {...props} />);
  });
  test('Parsed correctly', () => {
    const mappedTest = testCaseArray.map((i) => (
      <Testcase key={i.testNumber} {...i} />
    ));
    expect(wrapper.find(Testcase).getElements()).toEqual(mappedTest);
  });
});
