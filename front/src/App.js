import './App.scss';
import { Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/crews/:id'>
            
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
