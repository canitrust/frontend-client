/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailView from './DetailView';

import Disclaimer from './Disclaimer';
import DetailLegends from './DetailLegends';
import Tags from '../common/Tags';
import DetailTestcase from './DetailTestcase';
import DetailTable from './DetailTable';
import NotFoundErrorPage from '../common/NotFoundErrorPage';
import LoadingSpinner from '../common/LoadingSpinner';

const fetchMock = require('fetch-mock');

Enzyme.configure({ adapter: new Adapter() });

const renderWithMock = ({ matchId, testNumber, apiResult }) => {
  const id = testNumber || matchId;
  fetchMock.get(`end:testcase/${id}`, 200);

  const state = {
    error: false,
    isLoading: false,
    response: apiResult,
  };

  const wrapper = renderWithState({ matchId, testNumber, state });

  return wrapper;
};

const renderWithState = ({ matchId, testNumber, state }) => {
  const props = {
    match: {
      params: {
        id: matchId,
      },
    },
    testNumber,
  };

  const wrapper = render(props);
  wrapper.setState(state);

  return wrapper;
};

const render = (props) => {
  return shallow(<DetailView {...props} />);
};

describe('The Detail View component', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('should render correctly', () => {
    const apiResult = {
      testNumber: 16,
      title: 'title',
      description: 'description',
      detailedDescription: 'detailedDescription',
      tags: [
        {
          _id: 3,
          tagText: 'tag3',
        },
        {
          _id: 7,
          tagText: 'tag7',
        },
      ],
      question: 'question',
      possibleAnswers: [
        {
          ans_id: 1,
          ans_desc: 'Answer1',
        },
        {
          ans_id: 2,
          ans_desc: 'Answer2',
        },
        {
          ans_id: 3,
          ans_desc: 'Answer3',
        },
        {
          ans_id: 4,
          ans_desc: 'Answer4',
        },
      ],
      testResults: [
        {
          result: 2,
          _id: '5c4052941a1a571da99f7122',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 10,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7123',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 11,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: false,
        },
      ],
    };

    const wrapper = renderWithMock({
      matchId: 16,
      apiResult,
    });

    expect(fetchMock.called('end:16')).toBe(true);

    const detailTestcase = wrapper.find(DetailTestcase);
    expect(detailTestcase).toHaveLength(1);
    expect(detailTestcase.props().title).toEqual('title');
    expect(detailTestcase.props().description).toEqual('description');
    expect(detailTestcase.props().detailedDescription).toEqual(
      'detailedDescription'
    );

    const tags = wrapper.find(Tags);
    expect(tags).toHaveLength(1);
    expect(tags.props().tags).toHaveLength(2);
    const tagTexts = tags.props().tags.map((t) => t.tagText);
    expect(tagTexts).toContain('tag3');
    expect(tagTexts).toContain('tag7');

    const detailTable = wrapper.find(DetailTable);
    expect(detailTable).toHaveLength(1);
    expect(detailTable.props().testResults.map((t) => t.testNumber)).toContain(
      16
    );

    const detailLegends = wrapper.find(DetailLegends);
    expect(detailLegends).toHaveLength(1);
    expect(detailLegends.props().question).toEqual('question');

    expect(wrapper.find(Disclaimer)).toHaveLength(1);
  });

  test('should choose testNumber over match id', () => {
    const apiResult = {
      testNumber: 16,
      title: 'title',
      description: 'description',
      detailedDescription: 'detailedDescription',
      tags: [],
      question: 'question',
      possibleAnswers: [],
      testResults: [],
    };

    renderWithMock({ matchId: 16, testNumber: 17, apiResult });

    expect(fetchMock.called('end:17')).toBe(true);
  });

  test('should render in error state', () => {
    const state = { isLoading: false, error: true, response: {} };
    const wrapper = renderWithState({
      matchId: 16,
      state,
    });

    expect(wrapper.find(NotFoundErrorPage)).toHaveLength(1);
  });

  test('should render spinner by default', () => {
    fetchMock.get(`end:testcase/16`, 200);
    const wrapper = render({
      match: {
        params: {
          id: 16,
        },
      },
    });

    expect(wrapper.find(LoadingSpinner)).toHaveLength(1);
  });
});
