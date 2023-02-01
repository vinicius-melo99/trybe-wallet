import fetchCurrenciesApi from '../../helpers/fetchCurrenciesApi';

export const USER_LOGIN = 'USER_LOGIN';
export const GET_CURRENCIES_NAME = 'GET_CURRENCIES_NAME';

export const actionUserLogin = (email) => ({
  type: USER_LOGIN,
  payload: email,
});

const actionGetCurrenciesInfo = (names) => ({
  type: GET_CURRENCIES_NAME,
  payload: names,
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
