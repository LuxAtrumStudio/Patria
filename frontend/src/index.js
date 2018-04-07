import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
// import routes from './routes';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('body')
);
// ReactDOM.render(<App />, document.getElementById('body'));
// ReactDOM.render(
//   <Router history={browserHistory} routes={routes} />,
//   document.querySelector('#app')
// )
registerServiceWorker();
