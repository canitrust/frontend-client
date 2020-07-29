/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React, { Component } from 'react';
import Env from '../../configuration';
import NotFoundErrorPage from './NotFoundErrorPage';
import TagPage from '../Tag/TagPage';
import LoadingSpinner from './LoadingSpinner';
import DetailedView from '../DetailView/DetailView';
import HandleErrors from './HandleErrors';

export default class CanitrustinSomething extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: props.match.params.path,
      isTag: true,
      isLoading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.fetchAPITags();
  }

  fetchAPITags = (page = 1) => {
    const { path } = this.state;
    const getAPIEndpoint = (pathApi, aPage) =>
      `${Env.api.url}${Env.api.prefix}${pathApi}?page=${aPage}`;
    this.setState({ isLoading: true });
    let pathApi = `tag/${path}`;
    fetch(getAPIEndpoint(pathApi, page))
      .then(HandleErrors)
      .then((res) => {
        if (res && res.items instanceof Array) {
          return this.setState({
            testcases: res.items,
            isLoading: false,
            totalItem: res.totalItems,
            itemsPerPage: res.itemsPerPage,
          });
        }
        throw Error('No tag was found');
      })
      .catch(() => {
        pathApi = `testcase/path/${path}`;
        fetch(getAPIEndpoint(pathApi))
          .then(HandleErrors)
          .then((res) => {
            // eslint-disable-next-line no-underscore-dangle
            if (res._id) {
              return this.setState({
                isTag: false,
                isLoading: false,
                testNumber: res.testNumber,
              });
            }
            throw Error('No testcase has it path');
          })
          .catch(() => {
            this.setState({ error: 404, isLoading: false });
          });
      });
  };

  render() {
    const state = { ...this.state };
    const { location } = this.props;
    if (state.isLoading) return <LoadingSpinner />;

    if (state.error) return <NotFoundErrorPage />;

    if (state.isTag) return <TagPage {...state} />;
    return (
      <DetailedView
        testNumber={state.testNumber}
        path={state.path}
        hashId={
          location.hash
            ? location.hash.substring(1, location.hash.length)
            : undefined
        }
      />
    );
  }
}
