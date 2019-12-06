/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';

export default ({ possibleAnswers, question }) => {
  const answersElement = possibleAnswers.map((answer) => (
    <tr key={answer.ans_id}>
      <td className={`ans-${answer.ans_id} col-xs-1`} />
      <td className="answer col-sm-11">{answer.ans_desc}</td>
    </tr>
  ));
  return (
    <div>
      <h3>Legend</h3>
      <div className="tab-content">
        <p>{question}</p>
        <table className="table">
          <tbody>{answersElement}</tbody>
        </table>
      </div>
    </div>
  );
};
