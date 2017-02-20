import axios from 'axios';

const FETCH_GUESTS = 'FETCH_GUESTS';
const SAVE_GUEST = 'SAVE_GUEST';

const initState = { all: [], selected: null };

const FetchGuests = () => {
  const request = axios.get('/api/guests');

  return {
    type: FETCH_GUESTS,
    payload: request
  }
};

const SaveGuest = (guest) => {
  const request = axios.post('/api/guests', guest);
  return {
    type: SAVE_GUEST,
    payload: request
  };
};

const GuestsReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_GUESTS:
      return Object.assign({}, state, {all: action.payload.data.guests});
    case SAVE_GUEST:
      return Object.assign({}, state, {all: [...state.all, action.payload.data.guest]});

  }

  return state;
};

export default GuestsReducer;

export {FetchGuests, SaveGuest};