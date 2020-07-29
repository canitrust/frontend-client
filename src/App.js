/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import DetailView from './components/DetailView/DetailView';
import About from './components/StaticPages/About';
import CustomNavbar from './components/common/CustomNavbar';
import CustomFooter from './components/common/CustomFooter';
import Impress from './components/StaticPages/Impress';
import Contribute from './components/StaticPages/Contribute';
import SearchForm from './components/Search/SearchForm';
import Home from './components/Home/Home';
import SearchResult from './components/Search/SearchResult';
import TagPage from './components/Tag/TagPage';
import NotFoundErrorPage from './components/common/NotFoundErrorPage';
import CanitrustinSomething from './components/common/CanitrustinSomething';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: undefined,
      result: undefined,
    };
  }

  /**
   * Update search state
   * @param {Object} state - search state - more in const initialState.search
   */
  setSearchState = (newSearchState) => this.setState(newSearchState);

  render() {
    const { keyword, result } = this.state;
    return (
      <Router>
        <div>
          <CustomNavbar />
          <SearchForm
            setSearchState={this.setSearchState}
            keyword={keyword}
            result={result}
          />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              exact
              path="/search"
              render={(props) => (
                <SearchResult
                  {...props}
                  result={result}
                  keyword={keyword}
                  setSearchState={this.setSearchState}
                />
              )}
            />
            <Route exact path="/about" component={About} />
            <Route exact path="/impress" component={Impress} />
            <Route exact path="/contribute" component={Contribute} />
            <Route exact path="/detail/:id" component={DetailView} />
            <Route
              exact
              path="/detail/:id/:variationId"
              component={DetailView}
            />
            <Route exact path="/tag/:tagName" component={TagPage} />
            {/* path can be tagName or path of a testcase */}
            <Route exact path="/:path" component={CanitrustinSomething} />
            <Route component={NotFoundErrorPage} />
          </Switch>
          <CustomFooter />
        </div>
      </Router>
    );
  }
}
