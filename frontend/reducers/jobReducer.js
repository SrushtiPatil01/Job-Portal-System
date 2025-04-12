import { FETCH_JOBS, CREATE_JOB } from '../actions/jobActions';

const initialState = {
  jobs: [],
};

// Job reducer function
const jobReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };

    case CREATE_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload], // Add the new job to the existing list
      };

    default:
      return state;
  }
};

export default jobReducer;
