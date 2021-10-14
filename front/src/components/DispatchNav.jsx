import React from 'react';

const DispatchNav = () => {
  return (
    <nav className="dispatch-nav">
      <span className="dispatch-nav-logo">CrewLauncher</span>
      <div className="dispatch-nav-right">
        <button>Log In</button>
        <button>Sign Out</button>
      </div>
    </nav>
  );
};

export default DispatchNav;