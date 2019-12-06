/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PaginationPage from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('PaginationPage with 1 page only', () => {
  let wrapper;
  let props;
  beforeEach(() => {
    props = {
      activePage: 1,
      totalItem: 2,
      itemsPerPage: 5,
    };
    wrapper = mount(<PaginationPage {...props} />);
  });
  test('Checking if pagination is rendered correctly with only one page', () => {
    expect(wrapper.find('ul').hasClass('pagination')).toBe(true);
    const disabled = wrapper.find('li.disabled');
    expect(disabled.length).toBe(4);
    expect(disabled.at(0).text()).toEqual('«');
    expect(disabled.at(1).text()).toEqual('⟨');
    expect(disabled.at(2).text()).toEqual('⟩');
    expect(disabled.at(3).text()).toEqual('»');
    const active = wrapper.find('li.active');
    expect(active.find('a').text()).toEqual('1');
  });
});

describe('PaginationPage with three pages', () => {
  let wrapper1;
  let props;
  beforeEach(() => {
    props = {
      activePage: 2,
      totalItem: 12,
      itemsPerPage: 5,
    };
    wrapper1 = mount(<PaginationPage {...props} />);
  });

  test('Checking if pagination is rendered correctly with three pages', () => {
    expect(wrapper1.find('ul').hasClass('pagination')).toBe(true);
    const nonactive = wrapper1.find('li').not('.active');
    expect(nonactive.at(0).text()).toEqual('«');
    expect(nonactive.at(1).text()).toEqual('⟨');
    expect(nonactive.at(2).text()).toEqual('1');
    expect(nonactive.at(3).text()).toEqual('3');
    expect(nonactive.at(4).text()).toEqual('⟩');
    expect(nonactive.at(5).text()).toEqual('»');
    expect(nonactive.length).toBe(6);
    const active = wrapper1.find('li.active');
    expect(active.find('a').text()).toEqual('2');
  });
});

describe('PaginationPage with five pages - active page as #3', () => {
  let wrapper2;
  let props;
  beforeEach(() => {
    props = {
      activePage: 3,
      totalItem: 23,
      itemsPerPage: 5,
    };
    wrapper2 = mount(<PaginationPage {...props} />);
  });

  test('Checking if pagination is rendered correctly with active page as #3', () => {
    expect(wrapper2.find('ul').hasClass('pagination')).toBe(true);
    const nonactive = wrapper2.find('li').not('.active');
    expect(nonactive.length).toBe(8);
    expect(nonactive.at(0).text()).toEqual('«');
    expect(nonactive.at(1).text()).toEqual('⟨');
    expect(nonactive.at(2).text()).toEqual('1');
    expect(nonactive.at(3).text()).toEqual('2');
    expect(nonactive.at(4).text()).toEqual('4');
    expect(nonactive.at(5).text()).toEqual('5');
    expect(nonactive.at(6).text()).toEqual('⟩');
    expect(nonactive.at(7).text()).toEqual('»');
    const active = wrapper2.find('li.active');
    expect(active.find('a').text()).toEqual('3');
  });
});

describe('PaginationPage with eight pages - active page as #5', () => {
  let wrapper3;
  let props;
  beforeEach(() => {
    props = {
      activePage: 5,
      totalItem: 40,
      itemsPerPage: 5,
    };
    wrapper3 = mount(<PaginationPage {...props} />);
  });
  test('Checking if pagination is rendered correctly with active page as #5', () => {
    expect(wrapper3.find('ul').hasClass('pagination')).toBe(true);
    const nonactive = wrapper3.find('li').not('.active');
    expect(nonactive.length).toBe(8);
    expect(nonactive.at(0).text()).toEqual('«');
    expect(nonactive.at(1).text()).toEqual('⟨');
    expect(nonactive.at(2).text()).toEqual('3');
    expect(nonactive.at(3).text()).toEqual('4');
    expect(nonactive.at(4).text()).toEqual('6');
    expect(nonactive.at(5).text()).toEqual('7');
    expect(nonactive.at(6).text()).toEqual('⟩');
    expect(nonactive.at(7).text()).toEqual('»');
    const active = wrapper3.find('li.active');
    expect(active.find('a').text()).toEqual('5');
  });
});

describe('PaginationPage with no testcases returned', () => {
  let wrapper4;
  let props;
  beforeEach(() => {
    props = {
      activePage: 1,
      totalItem: 0,
    };
    wrapper4 = mount(<PaginationPage {...props} />);
  });
  test('Checking if no pagination is rendered', () => {
    expect(wrapper4.find('ul').exists()).toBe(false);
  });
});

describe('PaginationPage with no testcases returned - activePage and totalItem as negative numbers', () => {
  let wrapper5;
  let props;
  beforeEach(() => {
    props = {
      activePage: -1,
      totalItem: -1,
    };
    wrapper5 = mount(<PaginationPage {...props} />);
  });
  test('Checking if no pagination is rendered', () => {
    expect(wrapper5.find('ul').exists()).toBe(false);
  });
});
