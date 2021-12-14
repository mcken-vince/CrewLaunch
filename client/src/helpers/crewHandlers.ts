import axios, { AxiosResponse } from 'axios';
import { ICrew, IState } from '../definitions';

const createNewCrew = (crew: ICrew): Promise<AxiosResponse<ICrew>> => {
  return axios.post('/crews', crew);
};

export const handleCrewCreation = async (crew: ICrew, state: IState, updateState: Function): Promise<ICrew> => {
  try {
    const response = await createNewCrew(crew);
    const newCrew = response.data;
    const updatedCrews = [...state.crews, newCrew];
    updateState({crews: updatedCrews});
    return newCrew;
  } catch (err) {
    throw err;
  }
};

const deleteCrew = (id: string): Promise<AxiosResponse<any>> => {
  return axios.delete(`/crews/${id}`);
};

export const handleCrewDeletion = async (id: string, state: IState, updateState: Function): Promise<{type: boolean, message: string}> => {
  try {
    const jobsAssignedToCrew = state.jobs.filter(j => (j.crew_id && j.crew_id.toString() === id && !j.completed));
    if (jobsAssignedToCrew.length !== 0) {
      return {type: false, message: 'This crew cannot be deleted, they still have uncompleted jobs assigned.'};
    }
    await deleteCrew(id);
    const updatedCrews = state.crews.filter(c => c._id?.toString() !== id);
    updateState({crews: updatedCrews});
    return {type: true, message: 'Crew deleted!'};
  } catch (err) {
    throw err;
  }
};

const editCrew = (crew: ICrew): Promise<AxiosResponse<ICrew>> => {
  return axios.post('/crews/:id', crew);
};