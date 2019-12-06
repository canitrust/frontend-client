/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import { Link } from 'react-router-dom';
import './Testcase.css';
import Tags from './Tags';

/**
 * Component Testcase
 * @param {Object} testcase
 * @return {Component} <Testcase/>
 */
export default ({ title, tags, description, testNumber }) => (
  <div className="panel panel-default rounded-0 result">
    <Link to={`/detail/${testNumber}`} className="link">
      <h2>{title}</h2>
      <p className="break-word">{description}</p>
    </Link>
    <hr />
    <Tags tags={tags} />
  </div>
);
