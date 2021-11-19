import { render, screen, fireEvent } from '@testing-library/react';
import CustomSearchBar, { CustomSearchBarProps } from "../components/CustomSearchBar";

const onChange = jest.fn();

const renderCustomSearchBar = (props: Partial<CustomSearchBarProps> = {}) => {
  const defaultProps = {
    onChange,
    value: 'test'
  };
  return render(
    <CustomSearchBar {...defaultProps} {...props}/>
  );
};

describe('<CustomSearchBar />', () => {
  it('renders without crashing', () => {
    renderCustomSearchBar();
    expect(screen.getByDisplayValue(/test/)).toBeInTheDocument();
  });

  it('displays placeholder and label when given', () => {
    renderCustomSearchBar({placeholder:'tests all over the place', label: 'testlabel'});
    expect(screen.getByPlaceholderText(/tests all over the place/)).toBeInTheDocument();
    expect(screen.getByText(/testlabel/)).toBeInTheDocument();
  });

  it('calls onChange with input value when value is changed', () => {
    renderCustomSearchBar();
    const textInput = screen.getByRole('textbox');
    fireEvent.change(textInput, {target: {value: 'hello'}});
    expect(onChange).toHaveBeenCalled();
  });
});