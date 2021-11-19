import { MouseEventHandler } from 'react';
import '../styles/CrewsNav.scss';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { ICrew, IUser } from '../definitions';
import { Nav } from 'react-bootstrap';
import { markJobComplete } from '../helpers/jobHandlers';


const CrewsNav = (props: CrewsNavProps) => {
  const history = useHistory();
  const { user, crew, onLogout } = props;
  
  return (
    <Navbar className="crews-nav">
      <Link className='crews-nav-logo-link' to='/'><span className="crews-nav-logo">CrewLauncher</span></Link>
      
      <div className="crews-nav-right">

        <div className='crews-nav-buttons'>
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
          {user && user.email && crew &&
            <div className='crews-nav-links'>  
              <Nav.Link as={NavLink} to={`/crews/${crew._id}/jobs`}>My Jobs</Nav.Link>
              <Nav.Link as={NavLink} to={`/crews/${crew._id}`}>Dashboard</Nav.Link>
              
            </div>
          }
      </div>
    </Navbar>
  );
};

export default CrewsNav;

export interface CrewsNavProps {
  user?: IUser;
  onLogout: MouseEventHandler<HTMLButtonElement>;
  crew: ICrew | null;
};