/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default () => (
  <Navbar className="navbar-top" collapseOnSelect>
    <Navbar.Toggle aria-controls="navbar-top" />
    <Navbar.Collapse id="navbar-top">
      <Nav pullLeft>
        <NavItem componentClass="span">
          <Link to="/">Home</Link>
        </NavItem>
        <NavItem componentClass="span">
          <Link to="/about">About</Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
