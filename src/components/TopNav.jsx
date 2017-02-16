import React from 'react';
import AppBar from 'material-ui/AppBar';

const TopNav = () => {
  return (
    <div>
      <AppBar style={{zIndex: '9999', position: 'fixed'}} title="Kellockitin"/>
    </div>
  );
};

export default TopNav;