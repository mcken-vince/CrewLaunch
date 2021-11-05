import { FC, ReactElement } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import PackageCard from '../components/PackageCard';
import { PackagesOffcanvasProps } from '../components/component-types';

const PackagesOffcanvas: FC<PackagesOffcanvasProps> = (props): ReactElement => {
  const { show, handleClose, packages, selectPackage } = props;

  const packageCards: ReactElement[] = packages.map((p, idx) => {
    return (<PackageCard packageDetails={p} onSelect={selectPackage} key={idx} />)
  })

  return (
    <Offcanvas show={show} onHide={handleClose} placement='end'>
      <Offcanvas.Header closeButton >
        <Offcanvas.Title>All Packages</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {packageCards}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default PackagesOffcanvas;