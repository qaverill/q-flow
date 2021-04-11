import * as React from 'react';
// ----------------------------------
// PROVIDER
// ----------------------------------
const TimeframeFilterContext = React.createContext({});
export const TimeframeFilterProvider = (props) => {
  const { initStart, initEnd, children } = props;
  const [start, setStart] = React.useState(initStart);
  const [end, setEnd] = React.useState(initEnd);
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
