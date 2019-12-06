/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';

export default () => {
  const text = `The test results displayed on this page and the corresponding test definitions
  have been compiled with the greatest of care. We cannot, however, accept any responsibility for the correctness,
  completeness and up-to-dateness of the results.`;
  return (
    <div>
      <h3>Disclaimer</h3>
      <div className="tab-content">
        <p>{text}</p>
      </div>
    </div>
  );
};
