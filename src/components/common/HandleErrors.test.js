/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import HandleErrors from './HandleErrors';

describe('The Error Handler', () => {
  test('should return the JSON if no error', () => {
    const mockFn = jest.fn();
    const response = { ok: true, json: mockFn };
    HandleErrors(response);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  test('should throw an error if not OK', () => {
    const mockFn = jest.fn();
    const response = { ok: false, json: mockFn, statusText: 'foobar' };

    let resMessage = '';
    try {
      HandleErrors(response);
    } catch ({ message }) {
      resMessage = message;
    }

    expect(resMessage).toEqual('foobar');
    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
