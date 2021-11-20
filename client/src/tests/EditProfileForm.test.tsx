import { render, screen } from '@testing-library/react';
import EditProfileForm, {EditProfileFormProps} from '../components/forms/EditProfileForm';

const crew = { "_id": "616f7ceea703ecd4ec419645", "foreman_name": "Heddy Ready", "crew_size": 4, "is_active": true, "avatar": "https://getavataaars.com/?accessoriesType=Prescription02&avatarStyle=Transparent&clotheColor=PastelRed&clotheType=ShirtCrewNeck&eyeType=Squint&eyebrowType=FlatNatural&facialHairColor=BrownDark&facialHairType=BeardMajestic&graphicType=Resist&hairColor=PastelPink&mouthType=Smile&skinColor=Tanned&topType=WinterHat2", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" };

const renderEditProfileForm = (props: Partial<EditProfileFormProps> = {}) => {
  const defaultProps = {
    crew
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