import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import "./App.scss";
import React, { useEffect, useContext, useState } from "react";
import useAppData from "./hooks/useAppData";
import CrewsDashboardPage from './components/pages/CrewsDashboardPage';
import DispatchDashboardPage from './components/pages/DispatchDashboardPage';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import DispatchNav from './components/DispatchNav';

// interface IUser {
//   email: String;
//   admin: Boolean;
// };

function App() {
  const [user, setUser] = useState(null);
  const {state, updateState} = useAppData();
  // const Data = React.createContext(state);
  // const DataUpdate = React.createContext(updateState);
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }
  }, []);

  const handleLogin = (email, admin) => {
    setUser({email, admin});
    sessionStorage.setItem('user', JSON.stringify({email, admin}));
  };

  const handleLogout = () => {
    setUser(null);
    sessionStorage.removeItem('user');
  };

  return (
    <div className="App">

      <Router basename={'/'}>
      
            <Switch>
              <Route path="/login">
                <LoginForm onLogin={handleLogin} />
              </Route>
              <Route path="/register">
                <RegisterForm />
              </Route>
               
              <Route path="/crews/:id">
                <CrewsDashboardPage user={user} state={state} updateState={updateState} />
              </Route>

              <Route path="/dispatch" user={user}>
                <DispatchDashboardPage onLogout={handleLogout} user={user} state={state} updateState={updateState}/>
              </Route>

              <Route path="/">
                <DispatchNav user={user} onLogout={handleLogout}/>
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
