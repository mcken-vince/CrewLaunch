import { FC, ReactElement } from 'react';
import '../styles/DispatchNav.scss';
import { DispatchNavProps } from './component-types';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import LinkContainer from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';


const DispatchNav: FC<DispatchNavProps> = (props): ReactElement => {
  const { user } = props;
  
  const handleLogout = () => {};
  const handleLogin = () => {};
  const handleSignup = () => {};

  return (
    <Navbar className="dispatch-nav">
      <Link className='dispatch-nav-logo-link' to='/dispatch'><span className="dispatch-nav-logo">CrewLauncher</span></Link>
      
      <div className="dispatch-nav-right">

        <NavDropdown title={<span className='dispatch-nav-dropdown'>Forms</span>} >
            <Nav.Link as={NavLink} to='/dispatch/contracts/new'>New Contract</Nav.Link>
            <Nav.Link as={NavLink} to='/dispatch/packages/new'>New Package</Nav.Link>
            <Nav.Link as={NavLink} to='/dispatch/crews/new'>Add a Crew</Nav.Link>
        </NavDropdown>
        
        <NavDropdown title={<span className='dispatch-nav-dropdown'>Resources</span>} >
            <Nav.Link as={NavLink} to='/dispatch/clients'>Clients</Nav.Link>
            <Nav.Link as={NavLink} to='/dispatch/jobs'>Jobs</Nav.Link>
            <Nav.Link as={NavLink} to='/dispatch/crews'>Crews</Nav.Link>
            <Nav.Link as={NavLink} to='/dispatch/contracts'>Contracts</Nav.Link>
            <Nav.Link as={NavLink} to='/dispatch/packages'>Packages</Nav.Link>
        </NavDropdown>
        {user ? (
          <Button onClick={handleLogout}>Log Out</Button>) : (
          <>
            <Button onClick={handleLogin}>Log In</Button>
            <Button onClick={handleSignup}>Sign Up</Button>
          </>)
        }
      </div>
    </Navbar>
  );
};

export default DispatchNav;