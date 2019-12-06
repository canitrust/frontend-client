/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';

export default (props) => {
  const { result, error } = props;

  return (
    <div>
      <div className="text-center">
        <span>
          {result && !error
            ? `Found ${result.searchresult.length} result(s)`
            : null}
          {error && 'Something went wrong.'}
        </span>
      </div>
    </div>
  );
};
