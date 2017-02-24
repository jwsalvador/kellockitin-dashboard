import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton  from 'material-ui/RaisedButton';


const GuestAddDialog = ({children, handleClose, handleSubmit, open, disableSubmit, form}) => {
  const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={handleClose}
      />,
      <RaisedButton 
        onClick={(e) => {debugger;}}
        label="Submit"
        primary={true}
        disabled={disableSubmit}
      />,
    ];

  return (
    <div>
      <Dialog
          title="Add guest"
          actions={actions}
          modal={true}
          open={open}>
            
            {children}
          </Dialog>
    </div>
  );
};

export default GuestAddDialog;