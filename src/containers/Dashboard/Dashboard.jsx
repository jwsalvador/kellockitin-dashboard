import React, {Component} from 'react';
import {connect} from 'react-redux';

import {filterGuestsBy} from 'helpers/GuestHelpers';

import Paper from 'material-ui/Paper';

const style = {
  minHeight: 150,
  minWidth: 150,
  margin: 20,
  textAlign: 'center',
  display: 'inline-block',
};

class MainView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard">
        <div>
          <Paper style={style} zDepth={2}>
            <h2>Total Invited</h2>
            <h1>{this.props.guests.length}</h1>
          </Paper>
          <Paper style={style} zDepth={2}>
            <h2>Total Adults</h2>
            <h1>{filterGuestsBy('type', 'ADT', this.props.guests).length}</h1>
          </Paper>
          <Paper style={style} zDepth={2}>
            <h2>Total Teens</h2>
            <h1>{filterGuestsBy('type', 'TGR', this.props.guests).length}</h1>
          </Paper>
          <Paper style={style} zDepth={2}>
            <h2>Total Children</h2>
            <h1>{filterGuestsBy('type', 'CHD', this.props.guests).length}</h1>
          </Paper>
        </div>
        <div>
          <Paper style={style} zDepth={2}>
            <h2>Total RSVP</h2>
            <h1>{filterGuestsBy('rsvp', 'y', this.props.guests).length}</h1>
          </Paper>
          <Paper style={style} zDepth={2}>
            <h2>Not Going</h2>
            <h1>{filterGuestsBy('rsvp', 'n', this.props.guests).length}</h1>
          </Paper>
          <Paper style={style} zDepth={2}>
            <h2>No Status</h2>
            <h1>{filterGuestsBy('rsvp', '', this.props.guests).length}</h1>
          </Paper>
        </div>
        
      </div>
    );
  }
}

const mapStateToProps = ({Guests}) => {
  return {
    guests: Guests.all
  };
};

export default connect(mapStateToProps)(MainView);