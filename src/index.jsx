import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { StoreContext, reducer, initialState } from './store';
import App from './app';

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