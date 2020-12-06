import * as React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import App from './app';
import { StoreContext, reducer, initialState } from './store';

const Root = () => {
  const [state, dispatch] = React.useReducer(reducer, { ...initialState });
  return (
    <Router>
      <NotificationContainer />
      <StoreContext.Provider value={{ state, dispatch }}>
        <App />
      </StoreContext.Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
