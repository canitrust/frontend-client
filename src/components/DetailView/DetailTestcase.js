/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React, { useState } from 'react';
import { Collapse } from 'react-bootstrap';
import './DetailTestcase.css';
import ReactMarkdown from 'react-markdown';
import ButtonViewMore from '../common/ButtonViewMore';

export default (props) => {
  const { title, description, detailedDescription } = props;
  const [open, setOpen] = useState(false);

  return (
    <div>
      <h2>{title}</h2>
      <div>
        <ReactMarkdown source={description} />
        {detailedDescription && (
          <ButtonViewMore open={open} onClick={() => setOpen(!open)} />
        )}
      </div>
      <Collapse in={open}>
        <div>
          <hr />
          <ReactMarkdown source={detailedDescription} />
        </div>
      </Collapse>
    </div>
  );
};
