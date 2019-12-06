/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import StaticPage from './StaticPage';

const fetchMock = require('fetch-mock');

Enzyme.configure({ adapter: new Adapter() });

const render = (env) => {
  const props = {
    page: 'about',
    localContent: 'ABOUT  PAGE',
    env,
  };

  fetchMock.get('/static/about.html', '<div>foobar</div>');

  return shallow(<StaticPage {...props} />);
};

describe('The Static Page Component', () => {
  afterEach(() => {
    fetchMock.reset();
  });

  test('should render in local/dev environment', () => {
    const content = render('localhost').find('.text-center');
    expect(content.exists()).toBe(true);
    expect(content.text()).toContain('******* ABOUT  PAGE ********');
  });

  test('should render in staging/production environment', () => {
    render('staging');

    expect(fetchMock.called('/static/about.html')).toBe(true);
  });
});
