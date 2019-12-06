/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Testcases from '../common/Testcases';

export default (props) => {
  const { result } = props;
  if (result) {
    return (
      <div>
        <Testcases testcases={result.searchresult} />
      </div>
    );
  }
  return null;
};
