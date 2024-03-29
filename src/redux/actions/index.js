import fetchCurrenciesApi from '../../helpers/fetchCurrenciesApi';

export const USER_LOGIN = 'USER_LOGIN';
export const GET_CURRENCIES_NAME = 'GET_CURRENCIES_NAME';
export const SUBMIT_NEW_EXPENSE = 'SUBMIT_NEW_EXPENSE';
export const UPDATE_TOTAL_VALUE = 'UPDATE_TOTAL_VALUE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const TURN_ON_EDIT_MODE = 'TURN_ON_EDIT_MODE';
export const SUBMIT_EDITED_EXPENSE = 'SUBMIT_EDITED_EXPENSE';

export const actionUserLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

const actionSubmitNewExpense = (expense) => ({
  type: SUBMIT_NEW_EXPENSE,
  payload: expense,
});

export const actionDeleteExpense = (newList) => ({
  type: DELETE_EXPENSE,
  payload: newList,
});

export const actionTurnOnEditMode = (idToEdit) => ({
  type: TURN_ON_EDIT_MODE,
  payload: idToEdit,
});

export const actionSubmitEditedExpense = (editedList) => ({
  type: SUBMIT_EDITED_EXPENSE,
  payload: editedList,
});

const actionGetCurrenciesInfo = (names) => ({
  type: GET_CURRENCIES_NAME,
  payload: names,
});

export const actionUpdateTotalValue = (newValue) => ({
  type: UPDATE_TOTAL_VALUE,
  payload: newValue,
});

const getCurrenciesNameAndExpenses = (currencies) => {
  const currenciesList = (Object.values(currencies));
  const currenciesListName = currenciesList.map(({ code, codein, ask }) => ({
    code,
    codein,
    ask,
  }))
    .filter(({ codein }) => codein !== 'BRLT');
  const currenciesName = currenciesListName.map(({ code }) => code);
  const currenciesExpense = currenciesListName.map(({ ask }) => ask);
  return {
    currenciesName,
    currenciesExpense,
  };
};

export const getCurrenciesList = () => async (dispatch) => {
  const currencies = await fetchCurrenciesApi();
  const { currenciesName } = getCurrenciesNameAndExpenses(currencies);
  dispatch(actionGetCurrenciesInfo(currenciesName));
};

export const submitNewExpense = (formInfo) => async (dispatch) => {
  const currencies = await fetchCurrenciesApi();
  dispatch(actionSubmitNewExpense({
    ...formInfo,
    exchangeRates: {
      ...currencies,
    },
  }));
};
