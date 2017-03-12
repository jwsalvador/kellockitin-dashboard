import React, {Component} from 'react';
import {connect} from 'react-redux';

import {UpdateGuest} from 'ducks/modules/Guests';
import SocialPerson from 'material-ui/svg-icons/social/person';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {type: ''};
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if ((!this.props.selected && nextProps.selected) || (this.props.selected && this.props.selected._id !== nextProps.selected._id)) {
      this.setState({type: nextProps.selected.type})
    }
  }

  handleChange(e, index, value) {
    this.props.UpdateGuest(this.props.selected._id, 'type', value);
    this.setState({
      type: value
    });
  }

  render() {
    if (!this.props.selected) {
      return <div className="col-7">Please selected a guest to see their profile.</div>;
    }
    const {firstName, lastName, rsvp, diet, message, type} = this.props.selected;
    
    return (
      <div className="col-7" style={{textAlign: 'center', padding: '20px'}}>
        <div><SocialPerson style={{width: 150, height: 150}}/></div>
        <h2 className="name">{`${firstName} ${lastName}`}</h2>
        <SelectField
          style={{fontWeight: 600}}
          floatingLabelText="Guest type"
          value={this.state.type}
          onChange={this.handleChange}>
          <MenuItem value="ADT" primaryText="Adult" />
          <MenuItem value="TGR" primaryText="Teen" />
          <MenuItem value="CHD" primaryText="Child" />
        </SelectField>
        <h3>{`RSVP: ${rsvp === 'y' ? 'yes': rsvp === 'n' ? 'no' : 'No status yet'}`}</h3>
        <h3>{`Dietary Requirements: ${diet ? diet : 'No requirements provided'}`}</h3>
        <h3>{`Message: ${message ? message : 'No message provided'}`}</h3>
      </div>
    )
  }
}

export default connect(null, {UpdateGuest})(Profile);