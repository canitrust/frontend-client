/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DetailTable from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The Detail Table component', () => {
  const render = (props) => {
    return mount(<DetailTable {...props} />);
  };

  test('should render correctly in the good case', () => {
    const props = {
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
        {
          result: 3,
          _id: '5c4052946954284491342124',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 12,
          date_lasttest: '2019-01-10T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7125',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 13,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7126',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 14,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7127',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 15,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: true,
        },
        {
          result: 4,
          _id: '5c4052944573f72fe7ff5137',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 35,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 5,
          _id: '5c4052944573f72fe7ff5138',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 36,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 5,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 37,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: true,
        },
      ],
    };
    const wrapper = render(props);

    // Two browser titles are found and sorted alphabetically
    const head = wrapper.find('th');
    expect(head.at(0).text()).toEqual('Chrome');
    expect(head.at(1).text()).toEqual('Firefox');

    // Check the results
    const rows = wrapper.find('tr');
    expect(rows).toHaveLength(5);

    // 1st result row
    const row1 = rows.at(1);
    expect(row1.find('.latest')).toHaveLength(0);
    const cells1 = row1.find('td');
    expect(cells1).toHaveLength(2);
    expect(cells1.at(0).text()).toEqual('');
    expect(cells1.find('.ans-2').text()).toEqual('10');
    expect(cells1.find('.ans-3')).toHaveLength(0);
    expect(cells1.find('.ans-4')).toHaveLength(0);
    expect(cells1.find('.ans-5')).toHaveLength(0);
    expect(cells1.find('.browser-beta')).toHaveLength(0);

    // 2nd result row
    const row2 = rows.at(2);
    expect(row2.find('.latest')).toHaveLength(0);
    const cells2 = row2.find('td');
    expect(cells2).toHaveLength(2);
    expect(cells2.find('.ans-3').text()).toEqual('11-13');
    expect(cells2.find('.ans-2')).toHaveLength(0);
    expect(cells2.find('.ans-4').text()).toEqual('35');
    expect(cells2.find('.ans-5')).toHaveLength(0);
    expect(cells2.find('.browser-beta')).toHaveLength(0);

    // 3rd result row
    const row3 = rows.at(3);
    expect(row3.find('.latest')).toHaveLength(1);
    const cells3 = row3.find('td');
    expect(cells3).toHaveLength(2);
    expect(cells3.find('.ans-2')).toHaveLength(0);
    expect(cells3.find('.ans-3').text()).toEqual('14');
    expect(cells3.find('.ans-4')).toHaveLength(0);
    expect(cells3.find('.ans-5').text()).toEqual('36');
    expect(cells3.find('.browser-beta')).toHaveLength(0);

    // 4th result row
    const row4 = rows.at(4);
    expect(row4.find('.latest')).toHaveLength(0);
    const cells4 = row4.find('td');
    expect(cells4).toHaveLength(2);
    expect(cells4.find('.ans-2')).toHaveLength(0);
    expect(cells4.find('.ans-3').text()).toEqual('15(beta)');
    expect(cells4.find('.ans-4')).toHaveLength(0);
    expect(cells4.find('.ans-5').text()).toEqual('37(beta)');
    expect(cells4.find('.browser-beta')).toHaveLength(2);
  });

  test('should render correctly if test results are not in order', () => {
    const props = {
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
          result: 5,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 37,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: true,
        },
        {
          result: 3,
          _id: '5c4052946954284491342124',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 12,
          date_lasttest: '2019-01-10T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 4,
          _id: '5c4052944573f72fe7ff5137',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 35,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7126',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 14,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7125',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 13,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7127',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 15,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: true,
        },
        {
          result: 5,
          _id: '5c4052944573f72fe7ff5138',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 36,
          date_lasttest: '2019-01-03T00:00:00.000Z',
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
    const wrapper = render(props);

    // Two browser titles are found and sorted alphabetically
    const head = wrapper.find('th');
    expect(head.at(0).text()).toEqual('Chrome');
    expect(head.at(1).text()).toEqual('Firefox');

    // Check the results
    const rows = wrapper.find('tr');
    expect(rows).toHaveLength(5);

    // 1st result row
    const row1 = rows.at(1);
    expect(row1.find('.latest')).toHaveLength(0);
    const cells1 = row1.find('td');
    expect(cells1).toHaveLength(2);
    expect(cells1.at(0).text()).toEqual('');
    expect(cells1.find('.ans-2').text()).toEqual('10');
    expect(cells1.find('.ans-3')).toHaveLength(0);
    expect(cells1.find('.ans-4')).toHaveLength(0);
    expect(cells1.find('.ans-5')).toHaveLength(0);
    expect(cells1.find('.browser-beta')).toHaveLength(0);

    // 2nd result row
    const row2 = rows.at(2);
    expect(row2.find('.latest')).toHaveLength(0);
    const cells2 = row2.find('td');
    expect(cells2).toHaveLength(2);
    expect(cells2.find('.ans-3').text()).toEqual('11-13');
    expect(cells2.find('.ans-2')).toHaveLength(0);
    expect(cells2.find('.ans-4').text()).toEqual('35');
    expect(cells2.find('.ans-5')).toHaveLength(0);
    expect(cells2.find('.browser-beta')).toHaveLength(0);

    // 3rd result row
    const row3 = rows.at(3);
    expect(row3.find('.latest')).toHaveLength(1);
    const cells3 = row3.find('td');
    expect(cells3).toHaveLength(2);
    expect(cells3.find('.ans-2')).toHaveLength(0);
    expect(cells3.find('.ans-3').text()).toEqual('14');
    expect(cells3.find('.ans-4')).toHaveLength(0);
    expect(cells3.find('.ans-5').text()).toEqual('36');
    expect(cells3.find('.browser-beta')).toHaveLength(0);

    // 4th result row
    const row4 = rows.at(4);
    expect(row4.find('.latest')).toHaveLength(0);
    const cells4 = row4.find('td');
    expect(cells4).toHaveLength(2);
    expect(cells4.find('.ans-2')).toHaveLength(0);
    expect(cells4.find('.ans-3').text()).toEqual('15(beta)');
    expect(cells4.find('.ans-4')).toHaveLength(0);
    expect(cells4.find('.ans-5').text()).toEqual('37(beta)');
    expect(cells4.find('.browser-beta')).toHaveLength(2);
  });

  test('should render nothing if test results are empty', () => {
    const props = {
      testResults: [],
    };
    const wrapper = render(props);

    expect(wrapper).toHaveLength(1);
    expect(wrapper.at(0).html()).toBeNull();
  });

  test('should render correctly with gaps in the browser versions', () => {
    const props = {
      testResults: [
        {
          result: 3,
          _id: '5c4052941a1a571da99f7122',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 9,
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
        {
          result: 3,
          _id: '5c4052946954284491342124',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 12,
          date_lasttest: '2019-01-10T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7125',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 13,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7126',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 14,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7127',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 15,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: true,
        },
        {
          result: 4,
          _id: '5c4052944573f72fe7ff5137',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 35,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 5,
          _id: '5c4052944573f72fe7ff5138',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 36,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 5,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 37,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: true,
        },
        {
          result: 5,
          _id: '5c4052944573f72fe7ff5140',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 39,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: true,
        },
      ],
    };
    const wrapper = render(props);

    // Two browser titles are found and sorted alphabetically
    const head = wrapper.find('th');
    expect(head.at(0).text()).toEqual('Chrome');
    expect(head.at(1).text()).toEqual('Firefox');

    // Check the results
    const rows = wrapper.find('tr');
    expect(rows).toHaveLength(6);

    // 1st result row
    const row1 = rows.at(1);
    expect(row1.find('.latest')).toHaveLength(0);
    const cells1 = row1.find('td');
    expect(cells1).toHaveLength(2);
    expect(cells1.at(0).text()).toEqual('');
    expect(cells1.find('.ans-2')).toHaveLength(0);
    expect(cells1.find('.ans-3').text()).toEqual('9');
    expect(cells1.find('.ans-4')).toHaveLength(0);
    expect(cells1.find('.ans-5')).toHaveLength(0);
    expect(cells1.find('.browser-beta')).toHaveLength(0);

    // 2nd result row
    const row2 = rows.at(2);
    expect(row2.find('.latest')).toHaveLength(0);
    const cells2 = row2.find('td');
    expect(cells2).toHaveLength(2);
    expect(cells2.find('.ans-3').text()).toEqual('11-13');
    expect(cells2.find('.ans-2')).toHaveLength(0);
    expect(cells2.find('.ans-4').text()).toEqual('35');
    expect(cells2.find('.ans-5')).toHaveLength(0);
    expect(cells2.find('.browser-beta')).toHaveLength(0);

    // 3rd result row
    const row3 = rows.at(3);
    expect(row3.find('.latest')).toHaveLength(1);
    const cells3 = row3.find('td');
    expect(cells3).toHaveLength(2);
    expect(cells3.find('.ans-2')).toHaveLength(0);
    expect(cells3.find('.ans-3').text()).toEqual('14');
    expect(cells3.find('.ans-4')).toHaveLength(0);
    expect(cells3.find('.ans-5').text()).toEqual('36');
    expect(cells3.find('.browser-beta')).toHaveLength(0);

    // 4th result row
    const row4 = rows.at(4);
    expect(row4.find('.latest')).toHaveLength(0);
    const cells4 = row4.find('td');
    expect(cells4).toHaveLength(2);
    expect(cells4.find('.ans-2')).toHaveLength(0);
    expect(cells4.find('.ans-3').text()).toEqual('15(beta)');
    expect(cells4.find('.ans-4')).toHaveLength(0);
    expect(cells4.find('.ans-5').text()).toEqual('37(beta)');
    expect(cells4.find('.browser-beta')).toHaveLength(2);

    // 5th result row
    const row5 = rows.at(5);
    expect(row5.find('.latest')).toHaveLength(0);
    const cells5 = row5.find('td');
    expect(cells5).toHaveLength(2);
    expect(cells5.find('.ans-2')).toHaveLength(0);
    expect(cells5.find('.ans-3')).toHaveLength(0);
    expect(cells5.find('.ans-4')).toHaveLength(0);
    expect(cells5.find('.ans-5').text()).toEqual('39(beta)');
    expect(cells5.find('.browser-beta')).toHaveLength(1);
  });

  test('should render correctly if the latest stable version is the only non-beta version', () => {
    const props = {
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
        {
          result: 3,
          _id: '5c4052946954284491342124',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 12,
          date_lasttest: '2019-01-10T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7125',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 13,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7126',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 14,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 3,
          _id: '5c4052941a1a571da99f7127',
          testNumber: 16,
          browser: 'Firefox',
          browserVer: 15,
          date_lasttest: '2019-01-04T00:00:00.000Z',
          isBeta: true,
        },
        {
          result: 5,
          _id: '5c4052944573f72fe7ff5138',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 36,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 5,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 37,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: true,
        },
        {
          result: 1,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Safari',
          browserVer: 6,
          date_lasttest: '2019-01-02T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 1,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Safari',
          browserVer: 6.1,
          date_lasttest: '2019-01-02T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 1,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Safari',
          browserVer: 7.0,
          date_lasttest: '2019-01-02T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 1,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Safari',
          browserVer: 8.2,
          date_lasttest: '2019-01-02T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 1,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Safari',
          browserVer: 10.2,
          date_lasttest: '2019-01-02T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 1,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Safari',
          browserVer: 11.3,
          date_lasttest: '2019-01-02T00:00:00.000Z',
          isBeta: true,
        },
      ],
    };
    const wrapper = render(props);

    // Three browser titles are found and sorted alphabetically
    const head = wrapper.find('th');
    expect(head.at(0).text()).toEqual('Chrome');
    expect(head.at(1).text()).toEqual('Firefox');
    expect(head.at(2).text()).toEqual('Safari');

    // Check the results
    const rows = wrapper.find('tr');
    expect(rows).toHaveLength(5);

    // 1st result row
    const row1 = rows.at(1);
    expect(row1.find('.latest')).toHaveLength(0);
    const cells1 = row1.find('td');
    expect(cells1).toHaveLength(3);
    expect(cells1.at(0).text()).toEqual('');
    expect(cells1.find('.ans-1')).toHaveLength(0);
    expect(cells1.find('.ans-2').text()).toEqual('10');
    expect(cells1.find('.ans-3')).toHaveLength(0);
    expect(cells1.find('.ans-4')).toHaveLength(0);
    expect(cells1.find('.ans-5')).toHaveLength(0);
    expect(cells1.find('.browser-beta')).toHaveLength(0);

    // 2nd result row
    const row2 = rows.at(2);
    expect(row2.find('.latest')).toHaveLength(0);
    const cells2 = row2.find('td');
    expect(cells2).toHaveLength(3);
    expect(cells2.find('.ans-1').text()).toEqual('6-8.2');
    expect(cells2.find('.ans-3').text()).toEqual('11-13');
    expect(cells2.find('.ans-2')).toHaveLength(0);
    expect(cells2.find('.ans-4')).toHaveLength(0);
    expect(cells2.find('.ans-5')).toHaveLength(0);
    expect(cells2.find('.browser-beta')).toHaveLength(0);

    // 3rd result row
    const row3 = rows.at(3);
    expect(row3.find('.latest')).toHaveLength(1);
    const cells3 = row3.find('td');
    expect(cells3).toHaveLength(3);
    expect(cells3.find('.ans-1').text()).toEqual('10.2');
    expect(cells3.find('.ans-2')).toHaveLength(0);
    expect(cells3.find('.ans-3').text()).toEqual('14');
    expect(cells3.find('.ans-4')).toHaveLength(0);
    expect(cells3.find('.ans-5').text()).toEqual('36');
    expect(cells3.find('.browser-beta')).toHaveLength(0);

    // 4th result row
    const row4 = rows.at(4);
    expect(row4.find('.latest')).toHaveLength(0);
    const cells4 = row4.find('td');
    expect(cells4).toHaveLength(3);
    expect(cells4.find('.ans-1').text()).toEqual('11.3(beta)');
    expect(cells4.find('.ans-2')).toHaveLength(0);
    expect(cells4.find('.ans-3').text()).toEqual('15(beta)');
    expect(cells4.find('.ans-4')).toHaveLength(0);
    expect(cells4.find('.ans-5').text()).toEqual('37(beta)');
    expect(cells4.find('.browser-beta')).toHaveLength(3);
  });

  test('should render correctly with only one browser if the latest stable version is the only non-beta version', () => {
    const props = {
      testResults: [
        {
          result: 5,
          _id: '5c4052944573f72fe7ff5138',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 36,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: false,
        },
        {
          result: 5,
          _id: '5c4052944573f72fe7ff5139',
          testNumber: 16,
          browser: 'Chrome',
          browserVer: 37,
          date_lasttest: '2019-01-03T00:00:00.000Z',
          isBeta: true,
        },
      ],
    };
    const wrapper = render(props);

    // One browser
    expect(wrapper.find('th').text()).toEqual('Chrome');

    // Check the results
    const rows = wrapper.find('tr');
    expect(rows).toHaveLength(3);

    // 1st result row
    const row1 = rows.at(1);
    expect(row1.find('.latest')).toHaveLength(1);
    const cells1 = row1.find('td');
    expect(cells1).toHaveLength(1);
    expect(cells1.find('.ans-2')).toHaveLength(0);
    expect(cells1.find('.ans-3')).toHaveLength(0);
    expect(cells1.find('.ans-4')).toHaveLength(0);
    expect(cells1.find('.ans-5').text()).toEqual('36');
    expect(cells1.find('.browser-beta')).toHaveLength(0);

    // 2nd result row
    const row2 = rows.at(2);
    expect(row2.find('.latest')).toHaveLength(0);
    const cells2 = row2.find('td');
    expect(cells2).toHaveLength(1);
    expect(cells2.find('.ans-3')).toHaveLength(0);
    expect(cells2.find('.ans-2')).toHaveLength(0);
    expect(cells2.find('.ans-4')).toHaveLength(0);
    expect(cells2.find('.ans-5').text()).toEqual('37(beta)');
    expect(cells2.find('.browser-beta')).toHaveLength(1);
  });
});
