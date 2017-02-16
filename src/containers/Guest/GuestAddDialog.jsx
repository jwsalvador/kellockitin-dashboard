import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

const GuestAddDialog = ({children, handleClose, handleSubmit, open, disableSubmit}) => {
  const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        disabled={disableSubmit}
        onClick={handleSubmit}
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