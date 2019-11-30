import React, { useReducer } from 'react';

import taskFilterReducer from './taskFilterReducer';
import taskListReducer from './taskReducer';

const initialState = {
  filter: "all", // ToDo: use TaskFilterEnum
  tasks: []
}; 

const rootReducer = (state, action) => ({
  tasks: taskListReducer(state.tasks, action),
  filter: taskFilterReducer(state.filter, action)
});

const AppContext = React.createContext(initialState);

function AppProvider({ children }) {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export { AppContext, AppProvider };