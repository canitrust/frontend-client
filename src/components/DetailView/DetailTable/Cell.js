/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import DetailTableCellText from './CellText';

const tableCellStyle = (result) =>
  Number.isInteger(result) && result >= 0 && result <= 10
    ? `ans-${result}`
    : 'ans-default';

export default ({ testResult }) =>
  testResult ? (
    <td className={`${tableCellStyle(testResult.result)}`}>
      <DetailTableCellText testResult={testResult} />
    </td>
  ) : (
    <td />
  );
