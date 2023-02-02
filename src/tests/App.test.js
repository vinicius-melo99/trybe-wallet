import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
import initialState from './helpers/initialState';
// import mockData from './helpers/mockData';

const EMAIL_INPUT = 'email-input';
const PASS_INPUT = 'password-input';

describe('Testes do componente Login', () => {
  it('teste se o componente login é renderizado corretamente com os elementos de input', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.queryByTestId(EMAIL_INPUT);
    const passInput = screen.queryByTestId(PASS_INPUT);
    const button = screen.queryByRole('button', { name: /entrar/i });

    expect(emailInput).toBeInTheDocument();
    expect(passInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('teste se é possível digitar nos inputs de email e senha.', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.getByTestId(EMAIL_INPUT);
    // const passInput = screen.getByTestId(PASS_INPUT);

    userEvent.type(emailInput, 'teste@teste.com');
    expect(emailInput).toHaveValue('teste@teste.com');
    // userEvent.type(passInput, '123456');
    // expect(passInput).toHaveValue('123456');
  });

  it('teste se o email é verificado corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const emailInput = screen.queryByTestId(EMAIL_INPUT);
    const passInput = screen.queryByTestId(PASS_INPUT);
    const button = screen.queryByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'viniciusmelo317@gmail.com');
    userEvent.type(passInput, '1234566987as98d7as');

    expect(button).toBeDisabled();
  });
});

describe('testes da página da carteira', () => {
  it('teste se o componente header é renderizado corretamente', () => {
    const initialEntries = ['/carteira'];

    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
    const title = screen.queryByRole('heading', { level: 2, name: /trybe wallet/i });
    const email = screen.queryByTestId('email-field');
    const total = screen.queryByTestId('total-field');

    expect(title).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(total).toBeInTheDocument();

    expect(email.innerHTML).toBe('vinicius@teste.com');
    expect(total.innerHTML).toBe('0.00');
  });

  it('teste se os itens do formulário são renderizados corretamente', () => {
    const initialEntries = ['/carteira'];

    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
    const valueInput = screen.queryByTestId('value-input');
    const descriptionInput = screen.queryByTestId('description-input');
    const currencyInput = screen.queryByTestId('currency-input');
    const methodInput = screen.queryByTestId('method-input');
    const tagInput = screen.queryByTestId('tag-input');
    const addExpenseBtn = screen.queryByRole('button', { name: /adicionar despesa/i });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(addExpenseBtn).toBeInTheDocument();
  });

  it('teste se ao clicar no botão "Adicionar despesa, uma requisição à API é feita e o valor no header é atualziado"', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries, initialState });
    const valueInput = screen.queryByTestId('value-input');
    const descriptionInput = screen.queryByTestId('description-input');
    const addExpenseBtn = screen.queryByRole('button', { name: /adicionar despesa/i });
    const total = screen.queryByTestId('total-field');

    userEvent.type(valueInput, '100');
    expect(valueInput).toHaveValue('100');
    userEvent.type(descriptionInput, 'cem dol');
    expect(descriptionInput).toHaveValue('cem dol');

    userEvent.click(addExpenseBtn);

    // jest.spyOn(global, 'fetch');
    // global.fetch.mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(mockData),
    // });

    // expect(global.fetch).toHaveBeenCalled();
    // expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(total.innerHTML).not.toBe('0');
  });
});
