/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import { Link } from 'react-router-dom';
import './Tags.css';

export default ({ tags }) => {
  const tagElement = tags.map((item) => (
    // eslint-disable-next-line no-underscore-dangle
    <div className="tag" key={item._id}>
      <Link to={`/tag/${item.tagText}`}>{item.tagText}</Link>
    </div>
  ));
  return (
    <div className="block_tag">
      <div className="tag">
        <span className="glyphicon glyphicon-tags" />
        &nbsp;&nbsp;Tags
      </div>
      {tagElement}
    </div>
  );
};
