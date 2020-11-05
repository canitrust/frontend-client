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
import VariationTestcase from './VariationTestcase';

const getTestcaseAPIEndpoint = (testcaseId, variationId) => {
  if (variationId === undefined)
    return `${Env.api.url}${Env.api.prefix}testcase/${testcaseId}`;
  return `${Env.api.url}${Env.api.prefix}testcase/${testcaseId}/${variationId}`;
};

export default class DetailView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testcasePath: props.path,
      variationId: undefined,
      isLoading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.handle();
  }

  // There are two cases when switching testcase variants
  // 1. View main testcase by defined path: Testcase variant Ids in hash path (this.props.path which is passed through props from CanitrustinSomething Component)
  // 2. View main testcase by detail/:id path: Testcase variant Ids in route params (this.props.match.params.variationId)
  componentDidUpdate(prevProps) {
    const { match, hashId } = this.props;
    const prevMatch = prevProps.match;
    if (
      hashId !== prevProps.hashId ||
      (prevMatch !== undefined &&
        match.params.variationId !== prevMatch.params.variationId)
    ) {
      this.handle();
    }
  }

  handle = () => {
    const { match, testNumber, hashId } = this.props;
    const testcaseId = testNumber || match.params.id;
    let variationId = match ? match.params.variationId : hashId || undefined;
    if (variationId) variationId = parseInt(variationId, 10);
    fetch(getTestcaseAPIEndpoint(testcaseId, variationId))
      .then(HandleErrors)
      .then((res) => {
        if (res) {
          if (
            !variationId &&
            'variations' in res &&
            res.variations &&
            res.variations.length > 0
          )
            variationId = res.variations[0].id;
          return this.setState({
            error: false,
            isLoading: false,
            variationId,
            response: res,
          });
        }
        throw Error('Not found');
      })
      .catch(() => this.setState({ error: true, isLoading: false }));
  };

  render() {
    const {
      isLoading,
      error,
      response,
      testcasePath,
      variationId,
    } = this.state;

    if (isLoading) return <LoadingSpinner />;

    if (error) return <NotFoundErrorPage />;

    const {
      title,
      description,
      detailedDescription,
      tags,
      testResults,
      testNumber,
      possibleAnswers,
      question,
      path,
      variations,
      variation,
      variationOverview,
      mobileResults,
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
          {variations && variations.length && (
            <div>
              <hr />
              <VariationTestcase
                variations={variations}
                variationOverview={variationOverview}
                variationId={variationId}
                testcaseId={testNumber}
                path={testcasePath}
              />
            </div>
          )}
          <hr />
          <Tags tags={tags} />
          <hr />
          <DetailTable
            testResults={testResults || variation.testResults}
            mobileResults={mobileResults}
          />
          <hr />
        </div>
        <DetailLegends possibleAnswers={possibleAnswers} question={question} />
        <Disclaimer />
      </div>
    );
  }
}
