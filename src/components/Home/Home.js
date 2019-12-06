/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

/**
 * Component Home
 * Render a list of all testcases - paginated
 */
import React from 'react';
import Env from '../../configuration';
import Testcases from '../common/Testcases';
import PaginationPage from '../pagination';
import LoadingSpinner from '../common/LoadingSpinner';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      totalItem: 0,
      itemsPerPage: 5,
      testcases: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    // Typical usage (don't forget to compare props):
    this.getDataFromApi();
  }

  getDataFromApi = (page = 1) => {
    fetch(`${Env.api.url}${Env.api.prefix}testcase?page=${page}`)
      .then((results) => results.json())
      .then((data) => {
        const testcases = data.testcases.items;
        this.setState({
          testcases,
          totalItem: data.testcases.totalItems,
          activePage: data.testcases.currentPage,
          itemsPerPage: data.testcases.itemsPerPage,
          isLoading: false,
        });
      })
      .catch(() => {
        // TODO: render error
        this.setState({ isLoading: false });
      });
  };

  render() {
    const {
      testcases,
      activePage,
      totalItem,
      itemsPerPage,
      isLoading,
    } = this.state;
    if (isLoading) {
      return <LoadingSpinner />;
    }
    return (
      <div>
        <PaginationPage
          activePage={activePage}
          totalItem={totalItem}
          itemsPerPage={itemsPerPage}
          getApi={this.getDataFromApi}
        />
        <Testcases testcases={testcases} />
        <PaginationPage
          activePage={activePage}
          totalItem={totalItem}
          itemsPerPage={itemsPerPage}
          getApi={this.getDataFromApi}
        />
      </div>
    );
  }
}
