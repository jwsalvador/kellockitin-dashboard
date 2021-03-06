import React from 'react';
import {Link} from 'react-router';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';

import ActionHome from 'material-ui/svg-icons/action/home';
import SocialPeople from 'material-ui/svg-icons/social/people';
import Equalizer from 'material-ui/svg-icons/av/equalizer';

const SideNav = ({onTitleChange}) => {
  return (
    <div>
      <Drawer className="nav-left" open={true}>
        <Link to="/" onClick={() => onTitleChange('Dashboard')}><MenuItem leftIcon={<ActionHome />}>Home</MenuItem></Link>
        <Link to="guests" onClick={() => onTitleChange('Guests')}><MenuItem leftIcon={<SocialPeople/>}>Guests</MenuItem></Link>
        <Link to="stats" onClick={() => onTitleChange('Stats')}><MenuItem leftIcon={<Equalizer/>}>Stats</MenuItem></Link>
      </Drawer>
    </div>
  );
};

export default SideNav;