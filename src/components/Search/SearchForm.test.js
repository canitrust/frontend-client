/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import SearchForm from './SearchForm';

Enzyme.configure({ adapter: new Adapter() });

/* this file tests both SearchForm and SearchNotification
as we use mouting which renders both the component and its childen */
describe('Search Form component that has search results', () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      keyword: 'test',
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
      setSearchState: jest.fn(),
    };
    wrapper = mount(
      <Router>
        <SearchForm {...props} />
      </Router>
    );
    wrapper.setState({ isLoading: false, error: false });
  });
  test('check if child `SearchNotification` is rendered correctly with the number of results', () => {
    const div = wrapper.find('.text-center');
    const searchNotification = div.find('span');
    expect(searchNotification.text().includes('Found')).toBe(true);
    expect(searchNotification.text().includes('2')).toBe(true);
    expect(searchNotification.text().includes('result(s)')).toBe(true);
    wrapper.unmount();
  });
});

describe('Search Form component with 0 search result', () => {
  let wrapper1;
  beforeEach(() => {
    const props = {
      keyword: 'test',
      result: {
        searchresult: [],
      },
      setSearchState: jest.fn(),
    };
    wrapper1 = mount(
      <Router>
        <SearchForm {...props} />
      </Router>
    );
    wrapper1.setState({ isLoading: false, error: false });
  });
  test('check if child `SearchNotification` is rendered correctly with no result', () => {
    const div = wrapper1.find('.text-center');
    const searchNotification = div.find('span');
    expect(searchNotification.text().includes('Found')).toBe(true);
    expect(searchNotification.text().includes('0')).toBe(true);
    expect(searchNotification.text().includes('result(s)')).toBe(true);
    wrapper1.unmount();
  });
});

describe('Search Form component with undefined props', () => {
  let wrapper2;
  beforeEach(() => {
    const props = {
      keyword: undefined,
      result: undefined,
      setSearchState: jest.fn(),
    };
    wrapper2 = mount(
      <Router>
        <SearchForm {...props} />
      </Router>
    );
    wrapper2.setState({ isLoading: false, error: false });
  });
  test('check when Search Form has undefined props, SearchNotification not rendered', () => {
    expect(
      wrapper2
        .find('.text-center')
        .find('span')
        .text()
    ).toHaveLength(0);
    wrapper2.unmount();
  });
});
