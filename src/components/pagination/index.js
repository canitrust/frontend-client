/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import Pagination from 'react-js-pagination';
import './index.css';

export default class PaginationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePageChange = (pageNumber) => {
    const { getApi } = this.props;
    getApi(pageNumber);
  };

  render() {
    const { activePage, totalItem, itemsPerPage } = this.props;
    return totalItem > 0 ? (
      <div className="text-center">
        <Pagination
          activePage={activePage}
          itemsCountPerPage={itemsPerPage}
          totalItemsCount={totalItem}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
      </div>
    ) : null;
  }
}
