import { TOGGLE_NAV } from './navbar.const';

const initialState = {
  isOpen: false
}

export const navReducer = (state=initialState, action) => {

  switch(action.type) {

    case TOGGLE_NAV:
      return {...state, isOpen: !state.isOpen};

    default:
      return state;
  }
};