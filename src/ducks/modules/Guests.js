import axios from 'axios';

const FETCH_GUESTS = 'FETCH_GUESTS';
const SAVE_GUEST = 'SAVE_GUEST';
const LINK_GUESTS = 'LINK_GUESTS';
const DELETE_GUEST = 'DELETE_GUEST';
const UPDATE_GUEST = 'UPDATE_GUEST';

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

const LinkGuests = (ids) => {
  const request = axios.post('/api/guests/link', {ids});

  return {
    type: LINK_GUESTS,
    payload: request
  }
}

const UpdateGuest = (id, prop, value) => {
  const request = axios.put(`/api/guest/${id}`, {update: {prop, value}});

  return {
    type: UPDATE_GUEST,
    payload: request,
    update: {
      id, prop, value
    }
  }
};

const DeleteGuest = (id) => {
  const request = axios.delete(`/api/guest/${id}`);
  
  return {
    type: DELETE_GUEST,
    payload: request,
    id
  }
}

const GuestsReducer = (state = initState, action) => {
  switch(action.type) {
    case FETCH_GUESTS:
      return Object.assign({}, state, {all: action.payload.data.guests});
    case SAVE_GUEST:
      return Object.assign({}, state, {all: [...state.all, action.payload.data.guest]});
    case LINK_GUESTS:
    let newArr = [];
      state.all.forEach((item, i) => {
        let index = action.payload.data.guests.findIndex(m => m._id === item._id);
        if (index > -1) {
          newArr.push(Object.assign({}, action.payload.data.guests[index]));
        } else {
          newArr.push(item);
        }
      });
      return Object.assign({}, state, {all: newArr});
    case DELETE_GUEST:
      return Object.assign({}, state, {all: state.all.filter(m => m._id !== action.id)});
    case UPDATE_GUEST:
      const copy = Object.assign({}, state);
      const index = copy.all.findIndex(m => m._id === action.update.id);
      copy.all[index][action.update.prop] = action.update.value;
      return Object.assign({}, state, {all: copy.all});
  }

  return state;
};

export default GuestsReducer;

export {FetchGuests, SaveGuest, LinkGuests, DeleteGuest, UpdateGuest};