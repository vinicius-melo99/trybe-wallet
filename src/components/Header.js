import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;
    return (
      <header className="wallet-header">
        <h2>Trybe Wallet</h2>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          0
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (globalState) => {
  const { user: { email } } = globalState;
  return {
    email,
  };
};

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
