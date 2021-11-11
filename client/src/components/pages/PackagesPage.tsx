import { IPackage } from '../../definitions';
import '../../styles/PackagesPage.scss';
import { FC, ReactElement, useState } from 'react';
import PackageCard from '../PackageCard';
import CustomSearchBar from '../CustomSearchBar';

const PackagesPage: FC<PackagesPageProps> = (props): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const packages: IPackage[] = props.packages;
  const onDelete = props.onDelete;

  const filteredPackages = searchTerm ? packages.filter((p, idx) => {
    return p.title.toLowerCase().includes(searchTerm.toLowerCase());
  }) : packages;

  const packageCards = filteredPackages.map((p, idx) => {
    return (
      <PackageCard 
        key={idx}
        packageDetails={p} 
        onEdit={() => {alert(`Edit ${p.title}!`)}} 
        onDelete={onDelete}
      />);
  });

  return (
    <div className='packages-container'>
      <h1>Packages: {packages.length}</h1>
      <CustomSearchBar value={searchTerm} onChange={setSearchTerm} placeholder='Search by title'/>
      {packageCards}
    </div>
  );
};

export default PackagesPage;

interface PackagesPageProps {
  packages: IPackage[];
  onDelete: Function;
};