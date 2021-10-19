import React, { useState } from 'react';

const DataContext = React.createContext();
const DataUpdateContext = React.createContext();

export const DataContextProvider = ({ children }) => {
  const [state, setState] = useState({});

  return (
    <DataContext.Provider value={state}>
      <DataUpdateContext value={setState}>
        {children}
      </DataUpdateContext>
    </DataContext.Provider>
  );
};
