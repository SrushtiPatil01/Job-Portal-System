import { api } from '../utils/api';
export const FETCH_JOBS = 'FETCH_JOBS';
export const CREATE_JOB = 'CREATE_JOB';


export const fetchJobs = () => {
  return async (dispatch) => {
    try {
      const response = await api.get('/job/jobs');  // Correct endpoint
      dispatch({
        type: FETCH_JOBS,
        payload: response.data.jobs,
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };
};

export const createJob = (jobData) => {
  return async (dispatch) => {
    try {
      const response = await api.post('/job/create', jobData);  // Correct endpoint
      dispatch({
        type: CREATE_JOB,
        payload: response.data.job,
      });
    } catch (error) {
      console.error("Error creating job:", error);
    }
  };
};

