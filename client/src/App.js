import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import "./App.scss";
import React, { useEffect, useContext } from "react";
import useAppData from "./hooks/useAppData";
import CrewsDashboardPage from './components/pages/CrewsDashboardPage';
import DispatchDashboardPage from './components/pages/DispatchDashboardPage';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import DispatchNav from './components/DispatchNav';


function App() {
  const {state, updateState} = useAppData();
  // const Data = React.createContext(state);
  // const DataUpdate = React.createContext(updateState);

  return (
    <div className="App">

      <Router basename={'/'}>
      
            <Switch>
              <Route path="/login">
                <LoginForm />
              </Route>
              <Route path="/register">
                <RegisterForm />
              </Route>
              
              <Route path="/crews/:id">
                <CrewsDashboardPage state={state} updateState={updateState} />
              </Route>

              <Route path="/dispatch">
                <DispatchDashboardPage state={state} updateState={updateState}/>
              </Route>

              <Route path="/">
                <DispatchNav  />
                <h1>Welcome to Crew Launcher</h1>
                
                {/* <Link to="/dispatch">Dispatch</Link> <br/>
                <Link to="/crews/1">Crew #1</Link> <br/>
                <Link to="/crews/2">Crew #2</Link>

                <p>{JSON.stringify(state, null, 3)}</p> */}
              </Route>
            </Switch>


      </Router>
    </div>
  );
};

export default App;
