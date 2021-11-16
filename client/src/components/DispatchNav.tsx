import { FC, MouseEventHandler, ReactElement } from 'react';
import '../styles/DispatchNav.scss';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { IUser } from '../definitions';


const DispatchNav: FC<DispatchNavProps> = (props): ReactElement => {
  const history = useHistory();
  const { user, onLogout } = props;
  
  return (
    <Navbar className="dispatch-nav">
      <Link className='dispatch-nav-logo-link' to='/dispatch'><span className="dispatch-nav-logo">CrewLauncher</span></Link>
      
      <div className="dispatch-nav-right">

        <div className='nav-buttons'>
          {user && user.email ? (
            <>
              <span>{user.email}</span>
              <Button 
                data-testid='logout-button'
                onClick={(e) => {
                history.push('/');
                onLogout(e);
                }}>Log Out</Button>
            </>
          ) : (
            <>
              <Button data-testid='login-button'><Link to='/login'>Log In</Link></Button>
              <Button data-testid='signup-button'><Link to='/register'>Sign Up</Link></Button>
            </>)
          }
        </div>
          {user && user.email && 
          <div className='dispatch-nav-dropdowns'>
            <NavDropdown title={<span className='dispatch-nav-dropdown'>Forms</span>} align='end'>
                <Nav.Link as={NavLink} to='/dispatch/contracts/new'>New Contract</Nav.Link>
                <Nav.Link as={NavLink} to='/dispatch/packages/new'>New Package</Nav.Link>
                <Nav.Link as={NavLink} to='/dispatch/crews/new'>Add a Crew</Nav.Link>
            </NavDropdown>
            
            <NavDropdown title={<span className='dispatch-nav-dropdown'>Resources</span>} align='end' >
                <Nav.Link as={NavLink} to='/dispatch/clients'>Clients</Nav.Link>
                <Nav.Link as={NavLink} to='/dispatch/jobs'>Jobs</Nav.Link>
                <Nav.Link as={NavLink} to='/dispatch/crews'>Crews</Nav.Link>
                <Nav.Link as={NavLink} to='/dispatch/contracts'>Contracts</Nav.Link>
                <Nav.Link as={NavLink} to='/dispatch/packages'>Packages</Nav.Link>
            </NavDropdown>
          </div>}
      </div>
    </Navbar>
  );
};

export default DispatchNav;

export interface DispatchNavProps {
  user?: IUser,
  onLogout: MouseEventHandler<HTMLButtonElement>
};