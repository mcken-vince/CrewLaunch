import { render } from '@testing-library/react';
import EditProfileForm, {EditProfileFormProps} from '../components/forms/EditProfileForm';
import { sampleState } from './sampleData';

const renderEditProfileForm = (props: Partial<EditProfileFormProps> = {}) => {
  const defaultProps = {
    crew: sampleState.crews[0]
  };
  return render (
    <EditProfileForm {...defaultProps} {...props} />
  );
};

describe('<EditProfileForm />', () => {
  it('renders without crashing', () => {
    renderEditProfileForm();
  });
});