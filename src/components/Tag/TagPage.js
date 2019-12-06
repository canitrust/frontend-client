/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import PaginationPage from '../pagination';
import Testcases from '../common/Testcases';
import Env from '../../configuration';
import NotFoundErrorPage from '../common/NotFoundErrorPage';
import LoadingSpinner from '../common/LoadingSpinner';

export default class TagPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tag: props.path || props.match.params.tagName,
      testcases: props.testcases,
      isLoading: !props.path,
      error: false,
      activePage: 0,
      totalItem: props.totalItem,
      itemsPerPage: props.itemsPerPage,
    };
  }

  componentDidMount() {
    const { match, path } = this.props;
    if (!path) {
      this.setState({ tag: match.params.tagName });
      this.fetchAPI();
    }
  }

  componentDidUpdate() {
    const { match, path } = this.props;
    if (!path) {
      const { tag } = this.state;
      if (match.params.tagName !== tag) {
        this.setNewState({ tag: match.params.tagName });
        this.fetchAPI();
      }
    }
  }

  setNewState = (newState) => this.setState(newState);

  fetchAPI = (page = 1) => {
    const getAPIEndpoint = (tagName, aPage) =>
      `${Env.api.url}${Env.api.prefix}tag/${tagName}?page=${aPage}`;
    const { tag } = this.state;
    this.setState({ isLoading: true });
    fetch(getAPIEndpoint(tag, page))
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res;
      })
      .then((res) => {
        if (res && res.items instanceof Array) {
          return this.setState({
            testcases: res.items,
            isLoading: false,
            activePage: res.currentPage,
            totalItem: res.totalItems,
            itemsPerPage: res.itemsPerPage,
          });
        }
        return this.setState({ error: 404, isLoading: false });
      });
  };

  render() {
    const state = { ...this.state };
    if (state.isLoading) {
      return <LoadingSpinner />;
    }
    if (state.error) {
      return <NotFoundErrorPage />;
    }
    return (
      <div>
        <h3>
          #&nbsp;
          {state.tag}:
        </h3>
        <div>
          <PaginationPage
            activePage={state.activePage}
            totalItem={state.totalItem}
            itemsPerPage={state.itemsPerPage}
            getApi={this.fetchAPI}
          />
        </div>
        <Testcases testcases={state.testcases} />
        <div>
          <PaginationPage
            activePage={state.activePage}
            totalItem={state.totalItem}
            itemsPerPage={state.itemsPerPage}
            getApi={this.fetchAPI}
          />
        </div>
      </div>
    );
  }
}
