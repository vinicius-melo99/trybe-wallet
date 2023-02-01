import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { paymentMethods, expenseTags } from '../helpers/formOptions';

class WalletForm extends Component {
  state = {
    value: 0,
    description: '',
    // currency: 'USD',
    // paymentMethod: 'Dinheiro',
    // category: 'Alimentação'
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { value, description } = this.state;
    const { currencies } = this.props;
    return (
      <form>
        <label htmlFor="value-input">
          Valor:
          {' '}
          <input
            data-testid="value-input"
            id="value-input"
            name="value"
            type="number"
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
            data-testid="currency-input"
            id="currency-input"
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
            data-testid="method-input"
            id="method-input"
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
            data-testid="tag-input"
            id="tag-input"
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

      </form>
    );
  }
}

const mapStateToProps = (globalState) => {
  const { wallet: { currencies } } = globalState;
  return {
    currencies,
  };
};

WalletForm.propTypes = {
  currencies: PropTypes.instanceOf(Array).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
