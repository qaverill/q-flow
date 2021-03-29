import * as React from 'react';
// ----------------------------------
// PROVIDER
// ----------------------------------
const TimeframeFilterContext = React.createContext({});
export const TimeframeFilterProvider = ({ children }) => {
  const [start, setStart] = React.useState(null);
  const [end, setEnd] = React.useState(null);
  const [filter, setFilter] = React.useState(null);
  return (
    <TimeframeFilterContext.Provider
      value={{
        start,
        setStart,
        end,
        setEnd,
        filter,
        setFilter,
      }}
    >
      {children}
    </TimeframeFilterContext.Provider>
  );
};
export const useTimeframeFilter = () => React.useContext(TimeframeFilterContext);
