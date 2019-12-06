/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';

const renderBeta = (isBeta) =>
  isBeta ? <sup className="browser-beta">(beta)</sup> : '';

export default ({ testResult }) =>
  testResult.browserVerRange.from !== testResult.browserVerRange.to ? (
    <span>
      {testResult.browserVerRange.from}
      {renderBeta(testResult.isBeta)}-{testResult.browserVerRange.to}
      {renderBeta(testResult.isBeta)}
    </span>
  ) : (
    <span>
      {testResult.browserVerRange.from}
      {renderBeta(testResult.isBeta)}
    </span>
  );
