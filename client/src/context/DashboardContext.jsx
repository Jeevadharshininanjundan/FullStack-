import { createContext, useContext, useState } from 'react';

const DashboardContext = createContext();

export const useDashboard = () => useContext(DashboardContext);

export const DashboardProvider = ({ children }) => {
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => setRefreshFlag(prev => !prev); // flip the flag

  return (
    <DashboardContext.Provider value={{ refreshFlag, triggerRefresh }}>
      {children}
    </DashboardContext.Provider>
  );
};
