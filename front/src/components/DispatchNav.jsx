import React from 'react';
import '../styles/DispatchNav.scss';

const DispatchNav = (props) => {
  
  return (
    <nav className="dispatch-nav">
      <span className="dispatch-nav-logo">CrewLauncher</span>
      <div className="dispatch-nav-right">
        {props.user ? (
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