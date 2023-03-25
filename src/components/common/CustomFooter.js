/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustomFooter.css';

export default () => (
  <Navbar className="navbar-bottom" default collapseOnSelect>
    <Navbar.Brand href="https://www.mgm-sp.com">
      <a href="https://www.mgm-sp.com">
        <Image
          src="/assets/logo.png"
          href="https://www.mgm-sp.com"
          className="logo"
          height="25px"
          alt=""
        />
      </a>
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="navbar-bottom" />
    <Navbar.Collapse id="navbar-bottom">
      <Nav className="mr-auto">
        <NavItem componentClass="span">
          <Link to="/impress">Impress</Link>
        </NavItem>
        <NavItem componentClass="span">
          <Link to="/contribute">Contribute</Link>
        </NavItem>
        <NavItem componentClass="span">
          <Link to="/privacy-policy">Privacy Policy</Link>
        </NavItem>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
