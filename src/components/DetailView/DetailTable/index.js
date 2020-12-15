/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import './DetailTable.css';
import DetailTableRows from './Rows';
import DetailTableHeaders from './Headers';

// Set range of browser versions to a table item
const initRange = (testResult, isStable = false) => ({
  browserVerRange: {
    from: testResult.browserVer,
    to: testResult.browserVer,
  },
  isStable,
  ...testResult,
});

// Check two browser versions are continuous or not
// e.g. 6.0 vs 6.1 are continuous but 6.1 vs 8.0 are not
const isContinuousVersion = (a, b) => {
  if (a === b) return false;
  if (Math.floor(a) === Math.floor(b) || Math.floor(a) === Math.floor(b) - 1)
    return true;
  return false;
};

// Classify testresults by browser's name
const classifyTestresults = (testResults, browsers, groupedTestResults) => {
  const groupedTestResultsTmp = groupedTestResults;
  testResults.forEach((testResult) => {
    const browserName = `${testResult.browser}${
      'real_mobile' in testResult && testResult.real_mobile
        ? ` ${testResult.platform}`
        : ''
    }`;
    browsers.add(browserName);
    if (!groupedTestResultsTmp[browserName])
      groupedTestResultsTmp[browserName] = [];
    groupedTestResultsTmp[browserName].push(testResult);
  });
};

export default ({ testResults }) => {
  if (!testResults || testResults.length === 0) {
    return null;
  }

  const browsers = new Set([]); // Browser Names
  const groupedTestResults = {};
  let largestStableIndex = 0;

  // Classify testresults by browser's name
  classifyTestresults(testResults, browsers, groupedTestResults);

  // Sort the browsers in alphabetical
  const sortedBrowsers = Array.from(browsers).sort();

  // Sort testresults of each browser by version and group by same test result
  const tableBody = [];
  sortedBrowsers.forEach((browser) => {
    const column = [];
    let currentRange = null;
    let stableIndex = null;

    // Sort testresults of each browser according to the increasing browser versions
    const sortedGroupedNonBetaTestResults = groupedTestResults[browser]
      .filter((a) => !a.isBeta)
      .sort((a, b) => a.browserVer - b.browserVer);

    // The stable (non-beta) version with the highest number is considered the latest
    sortedGroupedNonBetaTestResults[
      sortedGroupedNonBetaTestResults.length - 1
    ].isStable = true;

    // Beta versions are after stable versions
    // Filter out beta versions which are older than the latest stable version
    const sortedGroupedBetaTestResults = groupedTestResults[browser]
      .filter(
        (a) =>
          a.isBeta &&
          a.browserVer >
            sortedGroupedNonBetaTestResults[
              sortedGroupedNonBetaTestResults.length - 1
            ].browserVer
      )
      .sort((a, b) => a.browserVer - b.browserVer);

    // Bring the results back together
    const sortedGroupedTestResults = sortedGroupedNonBetaTestResults.concat(
      sortedGroupedBetaTestResults
    );

    sortedGroupedTestResults.forEach((testResult) => {
      if (currentRange === null) {
        // Assign first testresult to a currentRange then comparing with the next testResult
        currentRange = initRange(testResult);
      } else if (testResult.isStable) {
        // If the current testResult is stable version, push the currentRange into column, then save
        // the index to find the largest index of stable testResult range (each column has one
        // stable testResult range) and update the largestStableIndex, then push the current
        // testResult into column
        column.push(currentRange);
        stableIndex = column.length;
        if (stableIndex > largestStableIndex) largestStableIndex = stableIndex;
        column.push(initRange(testResult, true));
        currentRange = null;
      } else if (testResult.isBeta && !currentRange.isBeta) {
        // If the current testResult is a beta version and the currentRange(previous
        // testresult range) is not, push the currentRange into column and init a new currentRange
        // Besides, If stableIndex = null means no testresult for stable version
        column.push(currentRange);
        currentRange = initRange(testResult);
      } else if (
        currentRange.result !== testResult.result ||
        (currentRange.result === testResult.result &&
          !isContinuousVersion(
            currentRange.browserVerRange.to,
            testResult.browserVer
          ))
      ) {
        // If the current testresult has a different testresult value than the currentRange or if
        // there is a gap in the browser version numbers,
        // push the previous range object into column and init a new currentRange
        column.push(currentRange);
        currentRange = initRange(testResult);
      } else {
        // If the current testresult has a same test result value with the currentRange
        // assign current testresult's browser version (larger than previous testresult)
        // into range of browser version
        currentRange.browserVerRange.to = testResult.browserVer;
      }
    });
    // Push the last currentRange into column
    if (currentRange !== null) column.push(currentRange);

    tableBody.push({
      browser,
      column,
      stableIndex,
    });
  });

  // Calculate offset of each browser's testresults according largestStableIndex
  let largestColumnLength = 0;
  tableBody.forEach((columnData) => {
    const offset = largestStableIndex - columnData.stableIndex;
    for (let i = 0; i < offset; i += 1) columnData.column.unshift(null);
    if (columnData.column.length > largestColumnLength) {
      largestColumnLength = columnData.column.length;
    }
  });
  // Make all columns have a same length
  tableBody.forEach((columnData) => {
    for (
      let j = 0;
      j < largestColumnLength - columnData.column.length;
      j += 1
    ) {
      columnData.column.push(null);
    }
  });

  return (
    <div>
      <table className="table testresult-table">
        <thead>
          <DetailTableHeaders browsers={sortedBrowsers} />
        </thead>
        <tbody>
          <DetailTableRows
            tableBody={tableBody}
            largestStableIndex={largestStableIndex}
          />
        </tbody>
      </table>
    </div>
  );
};
