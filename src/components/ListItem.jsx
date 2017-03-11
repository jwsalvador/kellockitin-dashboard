import React from 'react';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import {ListItem} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';

const iconButtonElement = (
  <IconButton
    touch={true}
  >
    <MoreVertIcon color={grey400} />
  </IconButton>
);

const rightIconMenu = (handleAddGuestGroup, handleDeleteGuest, id) => {
  return (<IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem onClick={() => handleAddGuestGroup(this, id)}>Link Guests</MenuItem>
    <MenuItem onClick={() => handleDeleteGuest(this, id)}>Delete</MenuItem>
  </IconMenu>);
};

const Item = ({showCheckbox, checked, id, primaryText, onCheckHandler, onClick, handleAddGuestGroup, handleDeleteGuest, disableMenuItems, secondaryText}) => {
  console.log(secondaryText);
  return (
    <ListItem 
      primaryText={primaryText}
      {...showCheckbox || disableMenuItems ? {} : {rightIconButton: rightIconMenu(handleAddGuestGroup, handleDeleteGuest, id)}}
      {...showCheckbox ? {leftCheckbox: (<Checkbox data={id} defaultChecked={checked} onCheck={onCheckHandler}/>)} : {}}
      onClick={() => onClick(this, id)}
      {...secondaryText}
      />
  );
};

export default Item;