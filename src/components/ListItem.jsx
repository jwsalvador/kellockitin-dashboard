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

const rightIconMenu = (handleAddGuest) => {
  return (<IconMenu iconButtonElement={iconButtonElement}>
    <MenuItem>Add</MenuItem>
    <MenuItem onClick={handleAddGuest}>Add to</MenuItem>
    <MenuItem>Delete</MenuItem>
  </IconMenu>)
};

const Item = ({showCheckbox, id, primaryText, onCheckHandler, handleAddGuest}) => {
  return (
    <ListItem 
      primaryText={primaryText}
      rightIconButton={rightIconMenu(handleAddGuest)}
      {...showCheckbox ? {leftCheckbox: (<Checkbox data={id}
      onCheck={onCheckHandler}/>)} : {}}
      />
  );
};

export default Item;