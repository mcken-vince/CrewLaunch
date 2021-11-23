import {render} from '@testing-library/react';
import PackagesPage, { PackagesPageProps } from '../components/pages/PackagesPage';
import { sampleState } from './sampleData';

const onDelete = jest.fn();

const renderPackagesPage = (props: Partial<PackagesPageProps> = {} ) => {
  const defaultProps = {
    packages: sampleState.packages,
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