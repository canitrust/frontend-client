/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import renderHTML from 'react-render-html';

export default class StaticPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    };
  }

  componentDidMount() {
    const { page, localContent, env } = this.props;
    if (env === 'staging' || env === 'product') {
      this.fetchAPI(page);
    } else {
      this.setState({
        data: `<div className="text-center"> ******* ${localContent} ********</div>`,
      });
    }
  }

  fetchAPI = (page) => {
    fetch(`/static/${page}.html`)
      .then((res) => res.text())
      .then((data) => {
        this.setState({
          data,
        });
      });
  };

  render() {
    const { data } = this.state;
    return <div>{renderHTML(data)}</div>;
  }
}
