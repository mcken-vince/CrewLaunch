import { useState, useEffect } from 'react';
import axios from 'axios';
import { IState } from '../definitions';

const useAppData = (): IAppData => {
  const [state, setState] = useState<IState | null>(null);

  useEffect(() => {
    Promise.all([
      axios.get('/api/crews'),
      axios.get('/api/clients'),
      axios.get('/api/packages'),
      axios.get('/api/contracts'),
      axios.get('/api/jobs')
    ])
    .then((data: any) => {
      const newState = {
        crews: data[0].data.result,
        clients: data[1].data.result,
        packages: data[2].data.result,
        contracts: data[3].data.result,
        jobs: data[4].data.result
      };
      // console.log('new state: ', newState);
      setState(newState);
    })
    .catch(err => 'Error fetching data!');
  }, []);

  const updateState = (update: any) => {
    setState(prev => ({...prev, ...update}));
  };

  return {state, updateState}
};

export default useAppData;

interface IAppData {
  state: IState | null;
  updateState: any;
};