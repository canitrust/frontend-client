/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import { Button } from 'react-bootstrap';
import './ButtonViewMore.css';

export default (props) => {
  const { open, onClick } = props;

  return (
    <Button className="more-btn" onClick={onClick}>
      <span
        className={`glyphicon glyphicon-triangle-${open ? 'top' : 'bottom'}`}
      />
      {open ? 'Less' : 'More'}
    </Button>
  );
};
