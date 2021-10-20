import { Router, Switch, Route, Link } from 'react-router-dom';
import "./App.scss";
import React, { useEffect, useContext } from "react";
import useAppData from "./hooks/useAppData";
import CrewsDashboardPage from './components/pages/CrewsDashboardPage';
import DispatchDashboardPage from './components/pages/DispatchDashboardPage';

function App() {
  const {state, updateState} = useAppData();
  const Data = React.createContext();
  const DataUpdate = React.createContext();

  return (
    <Router>
      <Data.Provider value={state}>
        <DataUpdate.Provider value={updateState}>
      <Switch>
        <div className="App">

        <Route path='/crews/:id' >
          <CrewsDashboardPage />
        </Route>
        
        <Route path='/dispatch' >
          <DispatchDashboardPage />
        </Route> 

        <Route path='/'>
          <h1>Welcome to Crew Launcher</h1>
          <Link to='/dispatch'>Dispatch</Link>
          <Link to='/crews/1'>Crew #1</Link>
          <Link to='/crews/2'>Crew #2</Link>
          
            <p>{JSON.stringify(state)}</p>
        </Route>
        </div>
      </Switch>
        </DataUpdate.Provider>
      </Data.Provider>
    </Router>
  );
}

export default App;
