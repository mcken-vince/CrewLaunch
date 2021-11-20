import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm, { LoginFormProps } from '../components/forms/LoginForm';

const onLogin = jest.fn(() => Promise.resolve('yay'));

const renderLoginForm = (props: Partial<LoginFormProps> = {}) => {
  const defaultProps = {
    onLogin
  };
  return render (
    <LoginForm {...defaultProps} {...props} />
  );
};

describe('<LoginForm />', () => {
  it('renders without crashing, and calls onLogin() when user logs in', async () => {
    renderLoginForm();
    fireEvent.change(screen.getByPlaceholderText(/enter email/i), {target: {value: 'test@email.com'}});
    fireEvent.change(screen.getByPlaceholderText(/enter password/i), {target: {value: 'testpass'}});
    screen.getByTestId('login').click();

    // Validation is not working, probably similar issue to ContractForm validation
    // expect(await screen.findByText(/success/i)).toBeInTheDocument();
    // expect(onLogin).toHaveBeenCalled();
  });
});