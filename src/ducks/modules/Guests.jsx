import axios from 'axios';

const FETCH_GUESTS = 'FETCH_GUESTS';
const SAVE_GUEST = 'SAVE_GUEST';

const initState = { all: [], selected: null };

const FetchGuests = () => {
  const request = axios.get('/api/guests');
  console.log(request);

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
  console.log(action.payload);
  switch(action.type) {
    case FETCH_GUESTS:
      return Object.assign({}, state, {all: action.payload.data});
    case SAVE_GUEST:
      return Object.assign({}, state, {all: [...state.all, action.payload.data]});

  }

  return state;
};

export default GuestsReducer;

export {FetchGuests, SaveGuest};