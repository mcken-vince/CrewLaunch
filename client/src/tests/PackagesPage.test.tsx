import {render} from '@testing-library/react';
import PackagesPage, { PackagesPageProps } from '../components/pages/PackagesPage';
import { IPackage } from '../definitions';

const packages: IPackage[] = [ { "_id": "616f7ceea703ecd4ec419647", "title": "Lawn Care Silver", "cost": 5000, "contract_length_days": 90, "visit_interval_days": 14, "man_hrs_per_visit": 4, "description": "3 Month, Biweekly: Mow, edge trim, blow off pathways", "createdAt": "2021-10-20T02:20:30.796Z", "updatedAt": "2021-10-20T02:20:30.796Z" }];
const onDelete = jest.fn();

const renderPackagesPage = (props: Partial<PackagesPageProps> = {} ) => {
  const defaultProps = {
    packages,
    onDelete
  };
  return render (
    <PackagesPage {...defaultProps} {...props} />
  );
};

describe('<PackagesPage />', () => {
  it('renders without crashing', () => {
    renderPackagesPage();
  });

  // write tests for searchbar and filter radio
});