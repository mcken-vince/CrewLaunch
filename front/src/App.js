// import { Router, Switch, Route } from 'react-router-dom';
import './App.scss';
import axios from 'axios';
import { useEffect, useState } from 'react';


function App() {
  const [state, setState] = useState({});
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/crews'),
      axios.get('/api/clients'),
      axios.get('/api/packages'),
      axios.get('/api/contracts'),
      axios.get('/api/jobs')
    ])
    .then(data => {
      const newState = {
        crews: data[0].data.result,
        clients: data[1].data.result,
        packages: data[2].data.result,
        contracts: data[3].data.result,
        jobs: data[4].data.result
      };
      console.log('new state: ', newState);
      setState(newState);
    })
    .catch(err => console.log('Error fetching data!', err));
  }, []);


  return (
    <div className="App">
      <h1>{state.crews && state.crews[0].foreman_name}</h1>
      
    </div>
  );
}

export default App;
