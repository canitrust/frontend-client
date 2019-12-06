/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Tags from './Tags';

Enzyme.configure({ adapter: new Adapter() });

describe('The tags component', () => {
  const render = (tags) => {
    return shallow(<Tags tags={tags} />);
  };

  test('renders with 0 tags', () => {
    const wrapper = render([]);

    expect(wrapper.find('.tag').length).toEqual(1);
  });

  test('renders with 2 tags', () => {
    const tags = [
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
    ];

    const wrapper = render(tags);

    expect(wrapper.find('.tag').length).toEqual(3);
  });

  test('renders with 3 tags', () => {
    const tags = [
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
      {
        _id: '5ca5bb8b2e372d7c12123456',
        tagNumber: 5,
        tagText: 'foobar',
      },
    ];

    const wrapper = render(tags);

    expect(wrapper.find('.tag').length).toEqual(4);
  });
});
