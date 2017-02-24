import FlatButton from 'material-ui/FlatButton';
import RaisedButton  from 'material-ui/RaisedButton';

const GuestActions = ({handleClose, handleSubmit, disableSubmit}) => {
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
      {actions}
    </div>
  );
};

export default GuestActions;