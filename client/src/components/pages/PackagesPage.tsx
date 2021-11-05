import { IPackage } from '../../definitions';
import '../../styles/PackagesPage.scss';
import { FC, ReactElement } from 'react';
import PackageCard from '../PackageCard';

const PackagesPage: FC<PackagesPageProps> = (props): ReactElement => {
  const packages: IPackage[] = props.packages;

  const packageCards = packages.map((p, idx) => {
    return (
      <PackageCard 
        key={idx}
        packageDetails={p} 
        onEdit={() => {alert(`Edit ${p.title}!`)}} 
        onDelete={() => {alert(`Delete ${p.title}!`)}}
      />);
  });

  return (
    <div className='packages-container'>

      <h1>Packages: {packages.length}</h1>
      {packageCards}
    </div>
  );
};

export default PackagesPage;

interface PackagesPageProps {
  packages: IPackage[];
};