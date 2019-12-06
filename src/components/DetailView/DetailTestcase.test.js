/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailTestcase from './DetailTestcase';

Enzyme.configure({ adapter: new Adapter() });

describe('Detail Testcase component with defined state', () => {
  const render = (props) => {
    return mount(<DetailTestcase {...props} />);
  };

  test('check if Detail Testcase renders correctly', () => {
    const props = {
      title:
        'Which Policy is enforced, when X-Frame-Options is set to contrary values?',
      description:
        'Approach: Visit https://ssl.example.mgm/iframe3.html. Which iframe is loaded?',
    };
    const wrapper = render(props);

    expect(wrapper.find('h2').text()).toEqual(props.title);
    expect(wrapper.find('p').text()).toEqual(props.description);
  });

  test('check if Markdown renders correctly', () => {
    const props = {
      title:
        'Which Policy is enforced, when X-Frame-Options is set to contrary values?',
      description:
        '### This is a markown title\nnow comes a listing:\n  * foo\n  * bar',
    };
    const wrapper = render(props);

    expect(wrapper.find('h3').text()).toEqual('This is a markown title');
    expect(wrapper.find('p').text()).toEqual('now comes a listing:');
    expect(wrapper.find('li').length).toEqual(2);
    // No "More" button if no detailedDescription
    expect(wrapper.find('button').length).toEqual(0);
  });

  test('check if Markdown renders correctly in detail description', () => {
    const props = {
      title:
        'Which Policy is enforced, when X-Frame-Options is set to contrary values?',
      description: 'Some description',
      detailedDescription:
        '### This is a markown title\nnow comes a listing:\n  * foo\n  * bar',
    };
    const wrapper = render(props);

    expect(wrapper.find('h2').text()).toEqual(props.title);
    expect(wrapper.find('h3').text()).toEqual('This is a markown title');
    expect(wrapper.find('li').length).toEqual(2);
    expect(wrapper.find('button').length).toEqual(1);
  });
});
