/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import { withRouter } from 'react-router-dom';
import Env from '../../configuration';
import './SearchForm.css';
import SearchNotification from './SearchNotification';
import HandleErrors from '../common/HandleErrors';

const API_ENDPOINT = `${Env.api.url}${Env.api.prefix}testcase/search`;
const POST_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/**
 * Component SearchForm
 */
class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      isLoading: false,
      error: false,
    };
  }

  performSearch = (event) => {
    const { keyword } = this.state;
    const { location, history, setSearchState } = this.props;

    // Prevent form submission (on pressing Enter)
    event.preventDefault();
    // Update pathname (slug)
    if (location.pathname !== '/search') history.push('/search');
    // Render isLoading
    this.setState({ isLoading: true });
    fetch(API_ENDPOINT, {
      method: 'POST',
      headers: POST_HEADERS,
      body: JSON.stringify({ name: keyword }),
    })
      .then(HandleErrors)
      .then((res) => {
        if (res) {
          setSearchState({ keyword, result: res });
          return this.setState({ error: false, isLoading: false });
        }
        throw Error('Connection Error');
      })
      .catch(() => this.setState({ error: true, isLoading: false }));
  };

  render() {
    const { result } = this.props;
    const { isLoading, error } = this.state;

    return (
      <div className="panel panel-default rounded-0">
        <form role="search" onSubmit={this.performSearch}>
          <div className="row">
            <div className="col-md-3 col-sm-3 vcenter">
              <span className="brand">Can I Trust in</span>
            </div>
            <div className="col-md-8 col-sm-8 vcenter">
              <div className="input-group stylish-input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  onChange={(event) =>
                    this.setState({ keyword: event.target.value })
                  }
                  required
                />
                <span className="input-group-addon">
                  <button
                    type="button"
                    className="focus-no-outline"
                    onClick={this.performSearch}
                  >
                    <span
                      className={`glyphicon ${
                        isLoading
                          ? 'glyphicon-refresh glyphicon-spin'
                          : 'glyphicon-search'
                      }`}
                    />
                  </button>
                </span>
              </div>
            </div>
          </div>
        </form>
        <SearchNotification result={result} error={error} />
      </div>
    );
  }
}

export default withRouter(SearchForm);
