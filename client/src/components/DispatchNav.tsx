import { FC, ReactElement } from 'react';
import '../styles/DispatchNav.scss';
import { DispatchNavProps } from './component-types';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { NavLink, Link } from 'react-router-dom';


const DispatchNav: FC<DispatchNavProps> = (props): ReactElement => {
  const { user } = props;
  
  return (
    <Navbar className="dispatch-nav">
      <Link className='dispatch-nav-logo-link' to='/dispatch'><span className="dispatch-nav-logo">CrewLauncher</span></Link>
      
      <div className="dispatch-nav-right">

        <NavDropdown title={<span className='dispatch-nav-dropdown'>Forms</span>} >
          <NavDropdown.Item>
            <NavLink to='/dispatch/contracts/new'>New Contract</NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink to='/dispatch/packages/new'>New Package</NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink to='/dispatch/crews/new'>Add a Crew</NavLink>
          </NavDropdown.Item>
        </NavDropdown>
        
        <NavDropdown title={<span className='dispatch-nav-dropdown'>Resources</span>} >
          <NavDropdown.Item>
            <NavLink to='/dispatch/clients'>Clients</NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink to='/dispatch/jobs'>Jobs</NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink to='/dispatch/crews'>Crews</NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink to='/dispatch/contracts'>Contracts</NavLink>
          </NavDropdown.Item>
          <NavDropdown.Item>
            <NavLink to='/dispatch/packages'>Packages</NavLink>
          </NavDropdown.Item>
        </NavDropdown>
        {user ? (
          <Button>Log Out</Button>) : (
          <>
            <Button>Log In</Button>
            <Button>Sign Up</Button>
          </>)
        }
      </div>
    </Navbar>
  );
};

export default DispatchNav;