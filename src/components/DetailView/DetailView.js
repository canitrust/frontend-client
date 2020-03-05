/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import Env from '../../configuration';
import NotFoundErrorPage from '../common/NotFoundErrorPage';
import LoadingSpinner from '../common/LoadingSpinner';
import Disclaimer from './Disclaimer';
import DetailLegends from './DetailLegends';
import Tags from '../common/Tags';
import DetailTestcase from './DetailTestcase';
import DetailTable from './DetailTable';
import HandleErrors from '../common/HandleErrors';

const getAPIEndpoint = (id) => `${Env.api.url}${Env.api.prefix}testcase/${id}`;

export default class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      error: false,
    };
  }

  componentDidMount() {
    const { match, testNumber } = this.props;
    const id = testNumber || match.params.id;
    fetch(getAPIEndpoint(id))
      .then(HandleErrors)
      .then((res) => {
        if (res) {
          return this.setState({
            error: false,
            isLoading: false,
            response: res,
          });
        }
        throw Error('Not found');
      })
      .catch(() => this.setState({ error: true, isLoading: false }));
  }

  render() {
    const { isLoading, error, response } = this.state;

    if (isLoading) return <LoadingSpinner />;

    if (error) return <NotFoundErrorPage />;

    const {
      title,
      description,
      detailedDescription,
      tags,
      testResults,
      possibleAnswers,
      question,
      path,
    } = response;

    const canonicalPath = `https://www.canitrust.in/${path}`;

    return (
      <div className="panel panel-default rounded-0 result">
        <Helmet>
          <link rel="canonical" href={canonicalPath} />
        </Helmet>
        <div className="testcase-info">
          <DetailTestcase
            title={title}
            description={description}
            detailedDescription={detailedDescription}
          />
          <hr />
          <Tags tags={tags} />
          <hr />
          <DetailTable testResults={testResults} />
          <hr />
        </div>
        <DetailLegends possibleAnswers={possibleAnswers} question={question} />
        <Disclaimer />
      </div>
    );
  }
}
