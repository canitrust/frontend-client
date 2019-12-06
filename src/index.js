/* ------------------------------------------------------------------------------------------------
 * Copyright (c) mgm security partners GmbH. All rights reserved.
 * Licensed under the AGPLv3 License. See LICENSE.md in the project root for license information.
 * ------------------------------------------------------------------------------------------------*/

import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import { AppContainer } from 'react-hot-loader';
import App from './App';
import * as serviceWorker from './serviceWorker';

require('react-hot-loader/patch');

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.unregister();

if (module.hot) {
  module.hot.accept('./App', () => {
    const DevApp = App.default;
    ReactDOM.render(
      <AppContainer>
        <DevApp />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
