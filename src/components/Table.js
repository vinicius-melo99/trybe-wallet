import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionDeleteExpense } from '../redux/actions';

class Table extends Component {
  deleteExpense = ({ target: { name } }) => {
    const { expenses, dispatch } = this.props;
    const newExpenseList = expenses.filter(({ id }) => id !== Number(name));
    dispatch(actionDeleteExpense(newExpenseList));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table className="wallet-table" border="1">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map(({
            id,
            description,
            tag,
            method,
            value,
            currency,
            exchangeRates,
            convertionCurrency = 'Real',
          }) => (
            <tr key={ id }>
              <td>{ description }</td>
              <td>{ tag }</td>
              <td>{ method }</td>
              <td>{ Number(value).toFixed(2) }</td>
              <td>{ exchangeRates[currency].name }</td>
              <td>{ Number(exchangeRates[currency].ask).toFixed(2) }</td>
              <td>
                { (value * exchangeRates[currency].ask)
                  .toFixed(2) }
              </td>
              <td>{ convertionCurrency }</td>
              <td>
                <button data-testid="edit-btn">Editar</button>
                <button
                  data-testid="delete-btn"
                  name={ id }
                  onClick={ this.deleteExpense }
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.instanceOf(Array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => {
  const { wallet: { expenses } } = globalState;
  return {
    expenses,
  };
};

export default connect(mapStateToProps)(Table);
