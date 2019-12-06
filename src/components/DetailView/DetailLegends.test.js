/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailLegends from './DetailLegends';

Enzyme.configure({ adapter: new Adapter() });

describe('Detail Legends component', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      possibleAnswers: [
        {
          ans_id: 1,
          ans_desc: 'one answer',
        },
        {
          ans_id: 2,
          ans_desc: 'other answer',
        },
      ],
      question: 'abc',
    };
    wrapper = shallow(<DetailLegends {...props} />);
  });

  test('should have a Legends label', () => {
    const legend = wrapper.find('h3');
    expect(legend).toHaveLength(1);
    expect(legend.text()).toEqual('Legend');
  });

  test('should have a question', () => {
    const question = wrapper.find('p');
    expect(question.text()).toEqual(props.question);
  });

  test('should have answers', () => {
    expect(wrapper.find('tr')).toHaveLength(2);

    const answer = wrapper
      .find('td')
      .filter('.answer')
      .map((node) => node.text());

    expect(answer).toEqual(['one answer', 'other answer']);

    expect(wrapper.find('.ans-1')).toHaveLength(1);
    expect(wrapper.find('.ans-2')).toHaveLength(1);
  });
});
