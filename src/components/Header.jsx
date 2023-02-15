import React, { Component } from 'react';
import { connect } from 'react-redux';
import { string, arrayOf, shape } from 'prop-types';
import '../styles/Header.css';

class Header extends Component {
  totalExpenses = () => {
    const { expenses } = this.props;
    const total = expenses.reduce((acc, { value, exchangeRates, currency }) => {
      const valueInBRL = value * exchangeRates[currency].ask;
      return acc + valueInBRL;
    }, 0);
    return total.toFixed(2);
  };

  render() {
    const { email } = this.props;
    return (
      <header className="header-form">
        <div className="logo">
          <h1>
            Crypto
            <span>Wallet</span>
          </h1>
        </div>
        <div className="infos">
          <p className="first">{email}</p>
          <p className="second">
            {`R$ `}{parseFloat(this.totalExpenses()).toFixed(2).replace('.',',')}
          </p>
          <p className="three">BRL</p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: string.isRequired,
  expenses: arrayOf(shape()).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);