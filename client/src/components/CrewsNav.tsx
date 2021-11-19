import { MouseEventHandler } from 'react';
import '../styles/CrewsNav.scss';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { IUser } from '../definitions';


const CrewsNav = (props: CrewsNavProps) => {
  const history = useHistory();
  const { user, onLogout } = props;
  
  return (
    <Navbar className="crews-nav">
      <Link className='crews-nav-logo-link' to='/'><span className="crews-nav-logo">CrewLauncher</span></Link>
      
      <div className="crews-nav-right">

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
          <div className='crews-nav-links'>  
            
          </div>}
      </div>
    </Navbar>
  );
};

export default CrewsNav;

export interface CrewsNavProps {
  user?: IUser;
  onLogout: MouseEventHandler<HTMLButtonElement>;
};