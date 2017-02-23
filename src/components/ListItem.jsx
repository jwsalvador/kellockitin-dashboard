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

const rightIconMenu = (handleAddGuestGroup, id) => {
  return (<IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Add Guests</MenuItem>
    <MenuItem onClick={() => handleAddGuestGroup(this, id)}>Link Guests</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>);
};

const Item = ({showCheckbox, id, primaryText, onCheckHandler, onClick, handleAddGuestGroup, disableMenuItems, secondaryText}) => {
  console.log(secondaryText);
  return (
    <ListItem 
      primaryText={primaryText}
      {...showCheckbox || disableMenuItems ? {} : {rightIconButton: rightIconMenu(handleAddGuestGroup, id)}}
      {...showCheckbox ? {leftCheckbox: (<Checkbox data={id}
      onCheck={onCheckHandler}/>)} : {}}
      onClick={() => onClick(this, id)}
      {...secondaryText}
      />
  );
};

export default Item;