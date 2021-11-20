import { render, screen, fireEvent } from '@testing-library/react';
import CrewForm, { CrewFormProps } from '../components/forms/CrewForm';

const onSubmit = jest.fn();

const renderCrewForm = (props: Partial<CrewFormProps> = {}) => {
  const defaultProps = {
    onSubmit,
    editCrew: null
  };
  return render (
    <CrewForm {...defaultProps} {...props} />
  );
};

describe('<CrewForm />', () => {
  it('renders without crashing', () => {
    renderCrewForm();
  });

  it('calls onSubmit when new crew is submitted', async () => {
    renderCrewForm();
    fireEvent.change(screen.getByPlaceholderText(/enter name/i), {target: {value: 'Foreman Name'}});
    fireEvent.change(screen.getByText(/select a number of workers/i), {target: {value: '1'}});
    screen.getByText(/submit/i).click();
    expect (await screen.findByText(/great success/i)).toBeInTheDocument();
  });
});