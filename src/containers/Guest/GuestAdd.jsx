import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import GuestAddDialog from './GuestAddDialog';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import {SaveGuest} from 'ducks/modules/Guests';

class GuestAdd extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      open: false,
      firstName: '',
      lastName: '',
      snackBar: false
    }

    this.handleOpen = this.handleOpen.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
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

  handleRequestClose() {
    this.setState({
      snackBar: false,
    });
  };

  handleOpen() {
    this.setState({open: true});
  };

  handleClose () {
    this.setState({open: false});
  };

  handleSubmit () {
    this.props.SaveGuest({
      firstName: this.state.firstName,
      lastName: this.state.lastName
    });

    this.setState({open: false, snackBar: true});
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
        <Snackbar
          open={this.state.snackBar}
          message="Guest added to your list"
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const mapStateToProps = ({Guests}) => {
  return {
    Guests
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return bindActionCreators({SaveGuest}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestAdd);