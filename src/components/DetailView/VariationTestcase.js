/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import { HashLink } from 'react-router-hash-link';

export default ({
  variations,
  variationOverview,
  variationId,
  testcaseId,
  path,
}) => {
  const variationsElement = variations.map((variationItem) => (
    <HashLink
      to={
        path
          ? `/${path}#${variationItem.id}`
          : `/detail/${testcaseId}/${variationItem.id}`
      }
      className={`variation-wrapper ${
        variationId === variationItem.id ? 'active' : ''
      }`}
      key={variationItem.id}
    >
      <h5>{variationItem.title}</h5>
      <small>{variationItem.description}</small>
    </HashLink>
  ));
  return (
    <div>
      <h3>Variations</h3>
      <div className="tab-content">
        <p>{variationOverview}</p>
      </div>
      {variationsElement}
    </div>
  );
};
