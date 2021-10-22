import Offcanvas from 'react-bootstrap/Offcanvas';
import PackageCard from '../components/PackageCard';

const PackagesOffcanvas = (props) => {
  const { show, handleClose, packages, selectPackage } = props;

  const packageCards = packages.map(p => {
    return (<PackageCard packageDetails={p} onSelect={selectPackage} />)
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