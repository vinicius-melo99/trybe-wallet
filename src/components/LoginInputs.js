import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { actionUserLogin } from '../redux/actions';

class LoginInputs extends React.Component {
  state = {
    email: '',
    password: '',
    buttonDisabled: true,
  };

  validateEmailFormat = (email) => {
    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return emailRegex.test(email);
  };

  validatePassword = () => {
    const { email, password } = this.state;
    const MAX_PASS_LENGTH = 6;
    const emailValidation = this.validateEmailFormat(email);
    const passLengthValidation = password.length >= MAX_PASS_LENGTH;
    const allValidations = emailValidation && passLengthValidation;

    this.setState({
      buttonDisabled: !allValidations,
    });
  };

  handleInput = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, this.validatePassword);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch, history } = this.props;
    const { email } = this.state;

    dispatch(actionUserLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, buttonDisabled } = this.state;
    return (
      <form onSubmit={ this.handleSubmit }>
        <label htmlFor="user-email-input">
          Email:
          <input
            data-testid="email-input"
            id="user-email-input"
            name="email"
            type="email"
            value={ email }
            onChange={ this.handleInput }
          />
        </label>
        <label htmlFor="user-email-input">
          Senha:
          <input
            data-testid="password-input"
            id="user-password-input"
            name="password"
            type="password"
            value={ password }
            onChange={ this.handleInput }
          />
        </label>
        <button
          disabled={ buttonDisabled }
        >
          Entrar
        </button>
      </form>
    );
  }
}

LoginInputs.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(LoginInputs);
