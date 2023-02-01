import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { paymentMethods, expenseTags } from '../helpers/formOptions';
import { actionUpdateTotalValue, submitNewExpense } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  dispatchToSubmitAction = () => {
    const { expenses, dispatch } = this.props;
    const id = expenses.length;
    console.log(id);
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    this.setState({
      value: '',
      description: '',
    });

    dispatch(submitNewExpense({
      id,
      value,
      description,
      currency,
      method,
      tag,
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.dispatchToSubmitAction();
  };

  calculateTotalValue = (expenses) => {
    const { dispatch } = this.props;
    const totalValue = expenses
      .reduce((sum, { value, currency, exchangeRates }) => {
        sum += value * exchangeRates[currency].ask;
        return sum;
      }, 0);
    dispatch(actionUpdateTotalValue(totalValue.toFixed(2)));
  };

  render() {
    const { value, description } = this.state;
    const { currencies, expenses } = this.props;
    this.calculateTotalValue(expenses);

    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            data-testid="value-input"
            id="value-input"
            name="value"
            type="text"
            onChange={ this.handleChange }
            value={ value }
          />
        </label>

        <label htmlFor="description-input">
          Descrição:
          {' '}
          <input
            data-testid="description-input"
            id="description-input"
            name="description"
            type="text"
            onChange={ this.handleChange }
            value={ description }
          />
        </label>

        <label htmlFor="currency-input">
          Moeda:
          {' '}
          <select
            name="currency"
            data-testid="currency-input"
            id="currency-input"
            onChange={ this.handleChange }
          >
            { currencies.map((currencie) => (
              <option key={ currencie }>
                {' '}
                {currencie}
                {' '}
              </option>
            )) }
          </select>
        </label>

        <label htmlFor="currency-input">
          Método de pagamento:
          {' '}
          <select
            name="method"
            data-testid="method-input"
            id="method-input"
            onChange={ this.handleChange }
          >
            { paymentMethods.map((method) => (
              <option key={ method }>
                {' '}
                {method}
                {' '}
              </option>
            )) }
          </select>
        </label>

        <label htmlFor="tag-input">
          Categoria:
          {' '}
          <select
            name="tag"
            data-testid="tag-input"
            id="tag-input"
            onChange={ this.handleChange }
          >
            { expenseTags.map((tag) => (
              <option key={ tag }>
                {' '}
                {tag}
                {' '}
              </option>
            )) }
          </select>
        </label>
        <button>Adicionar despesa</button>
      </form>
    );
  }
}

const mapStateToProps = (globalState) => {
  const { wallet: { currencies, expenses } } = globalState;
  return {
    currencies,
    expenses,
  };
};

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
