/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';

export default ({ browsers }) => (
  <tr>
    {browsers.map((browser) => (
      <th key={browser} width={`${100 / browsers.length}%`}>
        {browser.includes(' ') ? (
          <span>
            {browser.split(' ')[0]}
            <p className="mobile-browser">{browser.split(' ')[1]}</p>
          </span>
        ) : (
          browser
        )}
      </th>
    ))}
  </tr>
);
