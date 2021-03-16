import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreContext, reducer, initialState } from './store';
import App from './app';
// ----------------------------------
// COMPONENTS
// ----------------------------------
const Root = () => {
  const [state, dispatch] = React.useReducer(reducer, { ...initialState });
  return (
    <Router>
      <StoreContext.Provider value={{ state, dispatch }}>
        <App />
      </StoreContext.Provider>
    </Router>
  );
};

ReactDOM.render(<Root />, document.getElementById('root'));
