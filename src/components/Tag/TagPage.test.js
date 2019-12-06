/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import TagPage from './TagPage';

const THE_TAG = 'X-Frame-Options';
const THE_API_RESPONSE_SIMPLE_CASE = {
  items: [
    {
      _id: '5cbeb0280b3eb943756ea61b',
      testNumber: 13,
      title: 'Title 1',
      description: 'Description 1',
      date_created: '2019-01-17T00:00:00.000Z',
      question: 'Is the iframe loaded?',
      possibleAnswers: [
        {
          ans_id: 1,
          ans_desc: 'Yes',
        },
        {
          ans_id: 0,
          ans_desc: 'No',
        },
      ],
      tags: [
        {
          _id: '5cbeb0280b3eb943756ea633',
          tagNumber: 3,
          tagText: 'X-Frame-Options',
        },
        {
          _id: '5cbeb0280b3eb943756ea631',
          tagNumber: 1,
          tagText: 'CSP',
        },
      ],
    },
    {
      _id: '5cbeb0280b3eb943756ea61c',
      testNumber: 14,
      title: 'Title 2',
      description: 'Description 2',
      date_created: '2019-01-17T00:00:00.000Z',
      question: 'Is the iframe loaded?',
      possibleAnswers: [
        {
          ans_id: 1,
          ans_desc: 'Yes',
        },
        {
          ans_id: 0,
          ans_desc: 'No',
        },
      ],
      tags: [
        {
          _id: '5cbeb0280b3eb943756ea633',
          tagNumber: 3,
          tagText: 'X-Frame-Options',
        },
        {
          _id: '5cbeb0280b3eb943756ea631',
          tagNumber: 1,
          tagText: 'CSP',
        },
      ],
    },
  ],
  totalItem: 0,
  itemsPerPage: 5,
  offset: 0,
};

const THE_API_RESPONSE_COMPLICATED_CASE = {
  items: [
    {
      _id: '5cbeb0280b3eb943756ea61b',
      testNumber: 13,
      title: 'Title 1',
      description: 'Description 1',
      date_created: '2019-01-17T00:00:00.000Z',
      question: 'Is the iframe loaded?',
      possibleAnswers: [
        {
          ans_id: 1,
          ans_desc: 'Yes',
        },
        {
          ans_id: 0,
          ans_desc: 'No',
        },
      ],
      tags: [
        {
          _id: '5cbeb0280b3eb943756ea633',
          tagNumber: 3,
          tagText: 'X-Frame-Options',
        },
        {
          _id: '5cbeb0280b3eb943756ea631',
          tagNumber: 1,
          tagText: 'CSP',
        },
      ],
    },
    {
      _id: '5cbeb0280b3eb943756ea61c',
      testNumber: 14,
      title: 'Title 2',
      description: 'Description 2',
      date_created: '2019-01-17T00:00:00.000Z',
      question: 'Is the iframe loaded?',
      possibleAnswers: [
        {
          ans_id: 1,
          ans_desc: 'Yes',
        },
        {
          ans_id: 0,
          ans_desc: 'No',
        },
      ],
      tags: [
        {
          _id: '5cbeb0280b3eb943756ea633',
          tagNumber: 3,
          tagText: 'X-Frame-Options',
        },
        {
          _id: '5cbeb0280b3eb943756ea631',
          tagNumber: 1,
          tagText: 'CSP',
        },
      ],
    },
  ],
  totalItem: 20,
  itemsPerPage: 2,
  offset: 0,
};

const THE_ROUTE_PARAMS = {
  match: {
    params: { tagName: THE_TAG },
  },
};

Enzyme.configure({ adapter: new Adapter() });

describe('TagPage component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<TagPage {...THE_ROUTE_PARAMS} />, {
      disableLifecycleMethods: true,
    });
  });

  /**
   * TagPage after API call - simple response
   * Expect to see a Testcases component with correct props
   */
  test('TagPage after API call - simple response', () => {
    wrapper.setState({
      testcases: THE_API_RESPONSE_SIMPLE_CASE.items,
      isLoading: false,
      tag: THE_TAG,
      error: false,
      activePage: 1,
      totalItem: THE_API_RESPONSE_SIMPLE_CASE.totalItem,
      itemsPerPage: THE_API_RESPONSE_SIMPLE_CASE.itemsPerPage,
    });
    // The loading spinner must be removed:
    expect(wrapper.find('i.fa-spin').length).toBe(0);
    // There must be a Testcases component with correct props:
    expect(wrapper.find('Testcases').prop('testcases')).toEqual(
      THE_API_RESPONSE_SIMPLE_CASE.items
    );
    expect(wrapper.find('PaginationPage').length).toBe(2);
    // Expect pagination components to receive correct props
    expect(
      wrapper
        .find('PaginationPage')
        .at(0)
        .prop('activePage')
    ).toBe(1);
    expect(
      wrapper
        .find('PaginationPage')
        .at(0)
        .prop('totalItem')
    ).toBe(THE_API_RESPONSE_SIMPLE_CASE.totalItem);
    expect(
      wrapper
        .find('PaginationPage')
        .at(0)
        .prop('itemsPerPage')
    ).toBe(THE_API_RESPONSE_SIMPLE_CASE.itemsPerPage);
    expect(
      wrapper
        .find('PaginationPage')
        .at(0)
        .prop('getApi').constructor
    ).toBe(Function);
    // Expect the two pagination components to be identical
    expect(wrapper.find('PaginationPage').at(0)).toEqual(
      wrapper.find('PaginationPage').at(1)
    );
  });

  /**
   * TagPage after API call - complicated response
   * Expect to see a Testcases component with correct props
   */
  test('TagPage after API call - complicated response', () => {
    wrapper.setState({
      testcases: THE_API_RESPONSE_COMPLICATED_CASE.items,
      isLoading: false,
      tag: THE_TAG,
      error: false,
      activePage: 1,
      totalItem: THE_API_RESPONSE_COMPLICATED_CASE.totalItem,
      itemsPerPage: THE_API_RESPONSE_COMPLICATED_CASE.itemsPerPage,
    });
    // The loading spinner must be removed:
    expect(wrapper.find('i.fa-spin').length).toBe(0);
    // There must be a Testcases component with correct props:
    expect(wrapper.find('Testcases').prop('testcases')).toEqual(
      THE_API_RESPONSE_COMPLICATED_CASE.items
    );
    // 20 testcase found, there should be 2 pagination components (top & bottom)
    expect(wrapper.find('PaginationPage').length).toBe(2);
    // Expect pagination components to receive correct props
    expect(
      wrapper
        .find('PaginationPage')
        .at(0)
        .prop('activePage')
    ).toBe(1);
    expect(
      wrapper
        .find('PaginationPage')
        .at(0)
        .prop('totalItem')
    ).toBe(THE_API_RESPONSE_COMPLICATED_CASE.totalItem);
    expect(
      wrapper
        .find('PaginationPage')
        .at(0)
        .prop('itemsPerPage')
    ).toBe(THE_API_RESPONSE_COMPLICATED_CASE.itemsPerPage);
    expect(
      wrapper
        .find('PaginationPage')
        .at(0)
        .prop('getApi').constructor
    ).toBe(Function);
    // Expect the two pagination components to be identical
    expect(wrapper.find('PaginationPage').at(0)).toEqual(
      wrapper.find('PaginationPage').at(1)
    );
  });
});
