import * as React from 'react';
// ----------------------------------
// CONTEXT
// ----------------------------------
const AuditContext = React.createContext({});
export const useAuditContext = () => React.useContext(AuditContext);
// ----------------------------------
// PROVIDER
// ----------------------------------
export const AuditProvider = ({ children }) => {
  const [transactions, setTransactions] = React.useState([]);
  const [filterOutGreens, setFilterOutGreens] = React.useState(false);
  const [paybackFrom, setPaybackFrom] = React.useState(null);
  const [paybackTo, setPaybackTo] = React.useState(null);
  const getters = {
    transactions, filterOutGreens, paybackFrom, paybackTo,
  };
  const setters = {
    setTransactions, setFilterOutGreens, setPaybackFrom, setPaybackTo,
  };
  return (
    <AuditContext.Provider value={{ ...getters, ...setters }}>
      {children}
    </AuditContext.Provider>
  );
};
