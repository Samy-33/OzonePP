import 'bootstrap/dist/css/bootstrap.css';

import { Provider } from 'react-redux';
import store from './store/store'
import React from 'react';
import ReactDOM from 'react-dom';
import { Index } from './dashboard/indexwrapper/indexwrapper';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Index />
  </Provider>, document.getElementById('root'));

registerServiceWorker();
