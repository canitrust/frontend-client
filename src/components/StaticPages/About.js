/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import { Image } from 'react-bootstrap';
import StaticPage from './StaticPage';
import Env from '../../configuration';

export default () => {
  const page = 'about';
  const localContent =
    'Cross-browser testing is provided by Browserstack free of charge. Special thanks to Browserstack for supporting CanITrust.';
  const env = Env.Node;
  return (
    <div>
      <StaticPage page={page} localContent={localContent} env={env} />
      <a href="https://www.browserstack.com/">
        <Image
          src="https://camo.githubusercontent.com/fb4c4b31c0f3c17a8095585919abcae9e35bb099/687474703a2f2f77616c6c7061706572732d666f722d697061642e636f6d2f66756c6c706167652f696d6773332f6c6f676f732f62726f77736572737461636b332e706e67"
          href="https://www.browserstack.com/"
          className="logo"
          alt=""
          height="35px"
          style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto' }}
        />
      </a>
    </div>
  );
};
