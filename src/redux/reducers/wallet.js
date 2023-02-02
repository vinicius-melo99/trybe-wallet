// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  DELETE_EXPENSE,
  GET_CURRENCIES_NAME,
  SUBMIT_NEW_EXPENSE,
  UPDATE_TOTAL_VALUE,
  TURN_ON_EDIT_MODE,
  SUBMIT_EDITED_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  totalValue: 0,
};

const wallet = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case GET_CURRENCIES_NAME:
    return {
      ...state,
      currencies: payload,
    };
  case SUBMIT_NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: payload,
    };
  case SUBMIT_EDITED_EXPENSE:
    return {
      ...state,
      expenses: payload,
      editor: false,
      idToEdit: 0,
    };
  case TURN_ON_EDIT_MODE:
    return {
      ...state,
      editor: true,
      idToEdit: payload,
    };
  case UPDATE_TOTAL_VALUE:
    return {
      ...state,
      totalValue: payload,
    };
  default:
    return state;
  }
};

export default wallet;
