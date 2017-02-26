import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const Notification = ({open, message, handleClose}) => {
  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={4000}
      onRequestClose={handleClose}
    />
  );
};

export default Notification;