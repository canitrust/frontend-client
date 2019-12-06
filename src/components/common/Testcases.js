/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import PropTypes from 'prop-types';
import Testcase from './Testcase';

/**
 * Component Testcases
 * @param {Array} testcases fetched from Frontend-api
 * @return {Array of <Testcase>}
 */
class Testcases extends React.Component {
  // Validate prop types
  static propTypes = {
    testcases: PropTypes.instanceOf(Object), // must be object
  };

  // Set default props
  static defaultProps = {
    testcases: {
      searchresult: [],
    },
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { testcases } = this.props;

    const data = testcases.map((i) => <Testcase key={i.testNumber} {...i} />);
    return <div>{data}</div>;
  }
}

export default Testcases;
