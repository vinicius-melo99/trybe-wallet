import PropTypes from 'prop-types';
import React from 'react';
import LoginInputs from '../components/LoginInputs';

class Login extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <LoginInputs history={ history } />
    );
  }
}

Login.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired,
};

export default Login;
