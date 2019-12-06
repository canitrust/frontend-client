/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import StaticPage from './StaticPage';
import Env from '../../configuration';

export default () => {
  const page = 'impress';
  const localContent = 'IMPRESS PAGE';
  const env = Env.Node;
  return (
    <div>
      <StaticPage page={page} localContent={localContent} env={env} />
    </div>
  );
};
