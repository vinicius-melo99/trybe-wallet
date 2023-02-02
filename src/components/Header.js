import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email, totalValue } = this.props;
    return (
      <header className="wallet-header">
        <h2>Trybe Wallet</h2>
        <p data-testid="email-field">{ email }</p>
        <span data-testid="total-field">
          { totalValue }
        </span>
        <span data-testid="header-currency-field"> BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => {
  const { user: { email }, wallet: { totalValue } } = globalState;
  return {
    email,
    totalValue,
  };
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
  totalValue: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
