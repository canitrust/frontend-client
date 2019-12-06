/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Home from './Home';

import Testcases from '../common/Testcases';
import PaginationPage from '../pagination';
import LoadingSpinner from '../common/LoadingSpinner';

const fetchMock = require('fetch-mock');

Enzyme.configure({ adapter: new Adapter() });

const renderWithMock = (apiResult) => {
  fetchMock.get('end:testcase?page=1', 200);

  const state = {
    ...apiResult,
    isLoading: false,
  };

  const wrapper = render();
  wrapper.setState(state);

  return wrapper;
};

const render = () => {
  return shallow(<Home />);
};

describe('The Jome component', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('should render correctly', () => {
    const apiResult = {
      testcases: [{ result: 1 }, { result: 2 }],
      totalItem: 100,
      activePage: 1,
      itemsPerPage: 10,
    };

    const wrapper = renderWithMock(apiResult);

    expect(fetchMock.called('end:page=1')).toBe(true);

    const testcases = wrapper.find(Testcases);
    expect(testcases).toHaveLength(1);
    expect(testcases.props().testcases.map((t) => t.result)).toContain(1);

    const pagination = wrapper.find(PaginationPage);
    expect(pagination).toHaveLength(2);
    expect(pagination.at(0).props().activePage).toEqual(1);
    expect(pagination.at(0).props().totalItem).toEqual(100);
    expect(pagination.at(0).props().itemsPerPage).toEqual(10);
  });

  test('should render spinner by default', () => {
    fetchMock.get('end:page=1', 200);

    expect(render().find(LoadingSpinner)).toHaveLength(1);
  });
});
