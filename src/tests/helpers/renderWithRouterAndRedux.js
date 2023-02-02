// src/App.test.js
import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { applyMiddleware, legacy_createStore as createStore } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import rootReducers from '../../redux/reducers';

const renderWithRouterAndRedux = (
  component,
  {
    initialState = {},
    store = createStore(
      rootReducers,
      initialState,
      applyMiddleware(thunk),
    ),
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = {},
) => ({
  ...render(
    <Router history={ history }>
      <Provider store={ store }>
        {component}
      </Provider>
    </Router>,
  ),
  history,
});

export default renderWithRouterAndRedux;
