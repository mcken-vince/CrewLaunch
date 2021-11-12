import axios, { AxiosResponse } from 'axios';
import { ICrew, IState } from '../definitions';

const createNewCrew = (crew: ICrew) => {
  return axios.post('/crews', crew);
};

export const handleCrewCreation = async (crew: ICrew, state: IState, updateState: Function) => {
  try {
    const response = await createNewCrew(crew);
    const newCrew = response.data;
    const updatedCrews = [...state.crews, newCrew];
    updateState({crews: updatedCrews});
    return 'Crew created!';
  } catch (err) {
    throw err;
  }
};

const deleteCrew = (id: string) => {
  return axios.delete(`/crews/${id}`);
};

export const handleCrewDeletion = async (id: string, state: IState, updateState: Function) => {
  try {
    await deleteCrew(id);
    const updatedCrews = state.crews.filter(c => c._id?.toString() !== id);
    updateState({crews: updatedCrews});
    return 'Crew deleted!';
  } catch (err) {
    throw err;
  }
};