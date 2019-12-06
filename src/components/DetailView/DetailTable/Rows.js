/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import './DetailTable.css';
import DetailTableCell from './Cell';

export default ({ tableBody, largestStableIndex }) => {
  const rows = tableBody[0].column.map((columnItem, columnIndex) => {
    const row = [];
    let rowKey;

    for (let rowIndex = 0; rowIndex < tableBody.length; rowIndex += 1) {
      const testResult = tableBody[rowIndex].column[columnIndex];
      // eslint-disable-next-line no-underscore-dangle
      if (testResult && !rowKey) rowKey = testResult._id;
      row.push(<DetailTableCell key={rowIndex} testResult={testResult} />);
    }
    return (
      <tr
        key={rowKey}
        className={largestStableIndex === columnIndex ? 'latest' : ''}
      >
        {row}
      </tr>
    );
  });

  return rows;
};
