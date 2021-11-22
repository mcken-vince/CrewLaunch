import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import "./App.scss";
import { useEffect, useState } from "react";
import CrewsDashboardPage from './components/pages/CrewsDashboardPage';
import DispatchDashboardPage from './components/pages/DispatchDashboardPage';
import LoginForm from './components/forms/LoginForm';
import RegisterForm from './components/forms/RegisterForm';
import DispatchNav from './components/DispatchNav';
import { IUserLocal } from './definitions';


function App() {
  const [user, setUser] = useState<IUserLocal | undefined>(undefined);

  // const Data = React.createContext(state);
  // const DataUpdate = React.createContext(updateState);
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem('user');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
    }

    return (() => {

    });
  }, []);

  const handleLogin = (email: string, admin: boolean) => {
    setUser({email, admin});
    sessionStorage.setItem('user', JSON.stringify({email, admin}));
  };

  const handleLogout = () => {
    setUser(undefined);
    sessionStorage.removeItem('user');
  };

  return (
    <div className="App">

      <Router basename={'/'}>
        {!user && <DispatchNav user={user} onLogout={handleLogout}/>}
            <Switch>
              <Route path="/login">
                <LoginForm onLogin={handleLogin} /> 
              </Route>
              <Route path="/register">
                <RegisterForm /> 
              </Route>
               
              <Route path="/crews/:id">
                {user ?
                  <CrewsDashboardPage user={user} onLogout={handleLogout} /> :
                  <Redirect to='/'/>
                }
              </Route>

              <Route path="/dispatch" >
                {user ?
                  <DispatchDashboardPage onLogout={handleLogout} user={user} /> :
                  <Redirect to='/'/>
                }
              </Route>

              <Route path="/">
                <div className='home-page-container'>
                  <h1>Welcome to Crew Launcher</h1>
                  {!user ? <h3>Sign up to create a new account, <br/>or sign in with an existing account.</h3> :
                    <>
                      <Link to="/dispatch">Dispatch</Link> <br/>
                      <Link to="/crews/618ecaaf90dc0d9a157ef3b6">Crew #1</Link> <br/>
                      <Link to="/crews/61954b251808e29044c4cf03">Crew #2</Link>
                    </>
                  }
                </div>

              
              </Route>
            </Switch>

      </Router>
    </div>
  );
};

export default App;
