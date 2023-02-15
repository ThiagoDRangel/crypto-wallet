import React, { Component } from 'react';
import { connect } from 'react-redux';
import { arrayOf, string, func, bool } from 'prop-types';
import { getCurrency, getCurrencyValue, editSavedExpense } from '../redux/actions';
import '../styles/WalletForm.css';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
    id: 0,
  };

  componentDidMount() {
    this.fetchApiCurrecies();
  }

  componentDidUpdate() {
    const { editExpense, editor } = this.props;
    const { id } = this.state;
    if (editor && id !== editExpense.id) {
      this.setState({
        value: editExpense.value,
        description: editExpense.description,
        currency: editExpense.currency,
        method: editExpense.method,
        tag: editExpense.tag,
        id: editExpense.id,
        exchangeRates: editExpense.exchangeRates,
      });
    }
  }

  handleSavedEditExpense = () => {
    const { dispatch } = this.props;
    dispatch(editSavedExpense(this.state));
    this.setState({ value: '', description: '' });
  };

  fetchApiCurrecies = async () => {
    const { dispatch } = this.props;
    dispatch(getCurrency());
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    });
  };

  handleAddExpense = () => {
    // O id da despesa deve ser um número sequencial, começando em 0. Ou seja: a primeira despesa terá id 0, a segunda terá id 1, a terceira id 2, e assim por diante.
    const { id } = this.state;
    const { dispatch } = this.props;

    dispatch(getCurrencyValue(this.state));
    this.setState({ id: id + 1 });
    this.setState({ value: '', description: '' });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <form className="containerForm">
        <div>
          <label htmlFor="value">
            Valor
            <input
              type="number"
              id="value"
              data-testid="value-input"
              value={ value }
              onChange={ this.handleChange }
              name="value"
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              type="text"
              id="description"
              data-testid="description-input"
              value={ description }
              onChange={ this.handleChange }
              name="description"
            />
          </label>
        </div>
        <div>
          <label htmlFor="currency">
            Moeda
            <select
              id="currency"
              data-testid="currency-input"
              value={ currency }
              onChange={ this.handleChange }
              name="currency"
            >
              {currencies.map((abrevCurrency) => (
                <option
                  key={ abrevCurrency }
                  value={ abrevCurrency }
                >
                  {abrevCurrency}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select
              id="method"
              data-testid="method-input"
              value={ method }
              onChange={ this.handleChange }
              name="method"
            >
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </label>
          <label htmlFor="tag">
            Tag
            <select
              id="tag"
              data-testid="tag-input"
              value={ tag }
              onChange={ this.handleChange }
              name="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>
        </div>
        <button
          type="button"
          data-testid="save-btn"
          onClick={ editor ? this.handleSavedEditExpense : this.handleAddExpense }
        >
          {editor ? 'Editar despesa' : 'Adicionar despesa'}
        </button>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: func,
  currencies: arrayOf(string),
  editor: bool,
  editExpense: arrayOf(string),
}.isRequired;

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  editExpense: state.wallet.editExpense,
});

export default connect(mapStateToProps)(WalletForm);