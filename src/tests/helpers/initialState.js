import currencies from './mockCurrencies';

const initialState = {
  user: {
    email: 'vinicius@teste.com',
  },
  wallet: {
    currencies,
    expenses: [],
    editor: false,
    idToEdit: 0,
    totalValue: 0,
  },
};

export default initialState;
