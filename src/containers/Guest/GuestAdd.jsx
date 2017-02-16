import React, {Component} from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import GuestAddDialog from './GuestAddDialog';
import TextField from 'material-ui/TextField';

class GuestAdd extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false,
      firstName: '',
      lastName: ''
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeFirstNameStateHandler = this.changeFirstNameStateHandler.bind(this);
    this.changeLastNameStateHandler = this.changeLastNameStateHandler.bind(this);
  }

  changeFirstNameStateHandler(event, value) {
    this.setState({firstName: value});
  }

  changeLastNameStateHandler(event, value) {
    this.setState({lastName: value});
  }

  handleOpen() {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false});
  };

  handleSubmit () {
    console.log(this.state.firstName, this.state.lastName)
  }

  render() {
    const style = {position: 'absolute', right: '30px', top: '-30px'};

    return (
      <div>
        <FloatingActionButton secondary={true} style={style} onClick={this.handleOpen}>
          <ContentAdd />
        </FloatingActionButton>
        <GuestAddDialog 
          disableSubmit={!this.state.firstName && !this.state.lastName}
          open={this.state.open} 
          handleClose={this.handleClose} 
          handleSubmit={this.handleSubmit}>
          <TextField onChange={this.changeFirstNameStateHandler} floatingLabelText="First name"/><br />
          <TextField onChange={this.changeLastNameStateHandler} floatingLabelText="Last name"/><br />
        </GuestAddDialog>
      </div>
    );
  }
}

export default GuestAdd;