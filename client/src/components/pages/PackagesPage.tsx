import { IPackage } from '../../definitions';
import '../../styles/PackagesPage.scss';
import { FC, ReactElement, useState } from 'react';
import PackageCard from '../PackageCard';
import CustomSearchBar from '../CustomSearchBar';
import { Alert } from 'react-bootstrap';
import classNames from 'classnames';
import { IAlert } from '../../definitions';


const PackagesPage: FC<PackagesPageProps> = (props): ReactElement => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [alert, setAlert] = useState<IAlert>({show: false, type: true, message: ''});
  const packages: IPackage[] = props.packages;
  const onDelete = props.onDelete;

  const handleDelete = async (id: string) => {
    try {
      const result: {type: boolean, message: string} = await onDelete(id);
      console.log('result: ', result);
      setAlert({show: true, type: result.type, message: result.message});
    } catch (err: any) {
      setAlert({show: true, type: false, message: `Internal Error: ${err.message}`});
    }
  };

  const filteredPackages = searchTerm ? packages.filter((p, idx) => {
    return p.title.toLowerCase().includes(searchTerm.toLowerCase());
  }) : packages;

  const packageCards = filteredPackages.map((p, idx) => {
    return (
      <PackageCard 
        key={idx}
        packageDetails={p} 
        onEdit={() => {}} 
        onDelete={handleDelete}
      />);
  }).reverse();

  const alertVariant = classNames({'success': alert.type, 'danger': !alert.type});

  return (
    <div className='packages-container'>
      <h1>Packages: {packages.length}</h1>
      <Alert dismissible show={alert.show} variant={alertVariant} onClose={() => setAlert({show: false, type: true, message: ''})}>
        <Alert.Heading>{alert.message}</Alert.Heading>
      </Alert>
      <CustomSearchBar value={searchTerm} onChange={setSearchTerm} placeholder='Search by title'/>
      <div className='packages-grid'>
        {packageCards}
      </div>
    </div>
  );
};

export default PackagesPage;

interface PackagesPageProps {
  packages: IPackage[];
  onDelete: any;
};
