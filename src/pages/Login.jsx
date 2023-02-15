import React from 'react';
import { connect } from 'react-redux';
import { func, shape } from 'prop-types';
import { userLogin } from '../redux/actions';
import '../styles/Login.css';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => {
      this.validateFields();
    });
  };

  validateFields = () => {
    const { email, password } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const minLength = 6;
    const emailIsValid = emailRegex.test(email);
    const passwordIsValid = password.length >= minLength;
    if (emailIsValid && passwordIsValid) {
      return this.setState({ isDisabled: false });
    }
    return this.setState({ isDisabled: true });
  };

  handleClick = () => {
    const { email, password } = this.state;
    const { dispatch, history } = this.props;
    dispatch(userLogin(email, password));
    history.push('/carteira');
  };

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div className="container">
        <div className="containerLogin">
          <h1>Login</h1>
          <label htmlFor="email">
            Email:
            <input
              type="email"
              name="email"
              id="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="email-input"
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              type="password"
              name="password"
              id="password"
              value={ password }
              onChange={ this.handleChange }
              data-testid="password-input"
            />
          </label>
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ this.handleClick }
            data-testid="login-submit-btn"
          >
            Entrar
          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: func.isRequired,
  history: shape({
    push: func.isRequired,
  }).isRequired,
};

export default connect()(Login);