/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

export default (() => {
  let url = process.env.REACT_APP_API_URL || 'http://localhost:9191';
  let prefix = process.env.REACT_APP_API_PREFIX || '/api/v1/';
  const Node = process.env.REACT_APP_ENV_NODE || 'localhost';
  if (!prefix.startsWith('/')) {
    prefix = `/${prefix}`;
  }
  if (!prefix.endsWith('/')) {
    prefix = `${prefix}/`;
  }
  if (!url.startsWith('http') && !url.startsWith('//')) {
    url = `//${url}`;
  }
  const Env = {
    api: {
      url,
      prefix,
    },
    Node,
  };
  return Env;
})();
