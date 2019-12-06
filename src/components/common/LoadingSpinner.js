/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import './LoadingSpinner.css';

export default () => (
  <div className="load-container">
    <div className="spinner">
      <div className="bubble-1" />
      <div className="bubble-2" />
    </div>
  </div>
);
