import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton  from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';

import {SaveGuest} from 'ducks/modules/Guests';

class GuestAdd extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstName: '',
      lastName: '',
      type: '',
      snackBar: false
    }

    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.changeFirstNameStateHandler = this.changeFirstNameStateHandler.bind(this);
    this.changeLastNameStateHandler = this.changeLastNameStateHandler.bind(this);
    this.changeGuestTypeHandler = this.changeGuestTypeHandler.bind(this);
  }

  changeFirstNameStateHandler(event, value) {
    this.setState({firstName: value});
  }

  changeLastNameStateHandler(event, value) {
    this.setState({lastName: value});
  }

  changeGuestTypeHandler(event, index, value) {
    this.setState({type: value});
  }

  handleRequestClose() {
    this.setState({
      snackBar: false,
    });
  };

  handleSubmit () {
    this.props.SaveGuest({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      type: this.state.type
    });

    this.props.close();

    this.setState({snackBar: true});
  }

  render() {
    const style = {position: 'absolute', right: '30px', top: '-30px'};
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.props.close}
      />,
      <RaisedButton 
        onClick={this.handleSubmit}
        label="Submit"
        primary={true}
        disabled={!this.state.firstName && !this.state.lastName}
      />,
    ];

    return (
      <div>
        <Dialog
          title="Add guest"
          actions={actions}
          modal={true}
          open={this.props.open}>
            <TextField onChange={this.changeFirstNameStateHandler} floatingLabelText="First name"/><br />
            <TextField onChange={this.changeLastNameStateHandler} floatingLabelText="Last name"/><br />
            <SelectField
              floatingLabelText="Guest type"
              value={this.state.type}
              onChange={this.changeGuestTypeHandler}>
              <MenuItem value={null} primaryText="" />
              <MenuItem value="ADT" primaryText="Adult" />
              <MenuItem value="CHD" primaryText="Child" />
            </SelectField>
        </Dialog>
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