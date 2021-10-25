import React, { FunctionComponent, ReactElement } from 'react';
import '../styles/DispatchNav.scss';
import { DispatchNavProps } from './component-types';


const DispatchNav: FunctionComponent<DispatchNavProps> = (props): ReactElement => {
  const { user } = props;
  
  return (
    <nav className="dispatch-nav">
      <span className="dispatch-nav-logo">CrewLauncher</span>
      <div className="dispatch-nav-right">
        {user ? (
          <button>Log Out</button>) : (
          <>
            <button>Log In</button>
            <button>Sign Up</button>
          </>)
        }
      </div>
    </nav>
  );
};

export default DispatchNav;