import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import TextField from 'material-ui/TextField';

import Toggle from 'material-ui/Toggle';
import {List} from 'material-ui/List';
import GuestAdd from './GuestAdd';
import ListItem from 'components/ListItem';
import FlatButton from 'material-ui/FlatButton';
import SocialPerson from 'material-ui/svg-icons/social/person';

import {FetchGuests, LinkGuests} from 'ducks/modules/Guests';

class GuestsList extends Component {
  constructor(props) {
    super(props);
    this.props.FetchGuests();    

    this.selectedCheckboxes = new Set();
  }

  componentWillMount() {
    console.log('componentwillmount');
    this.state = {
      guests: this.props.guests,
      search: '',
      showCheckbox: false,
      mainLink: '',
      selected: null,
      showGroups: false
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleAddGuestGroup = this.handleAddGuestGroup.bind(this);
    this.handleCancelGuestGroup = this.handleCancelGuestGroup.bind(this);
    this.handleLinkGuests = this.handleLinkGuests.bind(this);
    this.handleShowProfile = this.handleShowProfile.bind(this);
    this.toggleShowGroups = this.toggleShowGroups.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentwillreceiveprops', nextProps)
    this.setState({guests: nextProps.guests});
  }

  handleAddGuestGroup(e, id) {
    this.setState({showCheckbox:true, mainLink: id});
  }

  handleCancelGuestGroup() {
    this.selectedCheckboxes = new Set();
    this.setState({showCheckbox: false, mainLink: ''});
  }

  handleSearch(e, value) {
    this.setState({
      search: value,
      guests: value ? 
        this.props.guests.filter((g) => (`${g.firstName.toLowerCase()} ${g.lastName.toLowerCase()}`).indexOf(value.toLowerCase()) > -1) : 
        this.props.guests
    })
  }

  handleLinkGuests() {
    this.props.LinkGuests([this.state.mainLink, ...this.selectedCheckboxes]);
  }

  handleShowProfile(e, id) {
    if (!id) {
      return;
    }

    const selected = this.state.guests.filter(m => m._id == id)[0];
    this.setState({selected})
  }

  toggleShowGroups(e, isToggled) {
    this.setState({showGroups: isToggled});
  }

  toggleCheckbox(e, isChecked) {
    const val = e.target.attributes.data.value;
    
    if (isChecked) {
      if (!this.selectedCheckboxes.has(val)) {
        this.selectedCheckboxes.add(val);
      }
    } else {
      this.selectedCheckboxes.delete(val);
    }
  }

  getGuestListItemAttributes(guest) {
    return {
      key: guest._id,
      id: guest._id,
      primaryText: `${guest.firstName} ${guest.lastName}`,
      onCheckHandler: this.toggleCheckbox,
      showCheckbox: this.state.showCheckbox,
      handleAddGuestGroup: this.handleAddGuestGroup,
      onClick: this.handleShowProfile
    }
  }

  renderGuestsContainer() {
    if (!this.state.guests) {
      return;
    }

    return (
      <div style={{display: 'flex'}}>
        {this.renderGuestsList()}
        {this.renderGuestProfile()}
      </div>
      );
    
  }

  renderLinkGuests() {
    return (
      <div>
        <FlatButton label="Link" secondary={true} onClick={this.handleLinkGuests}/>
        <FlatButton label="Cancel" primary={true} onClick={this.handleCancelGuestGroup}/>
      </div>
    );
  }

  renderGuestsList() {
    return (
      <div className="col-3">
        <div>
          <TextField onChange={this.handleSearch} floatingLabelText="Search" />
        </div>
        <div>
          <Toggle label="Show group" labelPosition="right" labelStyle={{fontSize: '11'}} onToggle={this.toggleShowGroups}/>
        </div>
        { this.state.showCheckbox && this.renderLinkGuests() }
        <List className="name">
          {this.state.guests.filter(m => m._id !== this.state.mainLink).map(m => {
            let att = this.getGuestListItemAttributes(m);
            let nesteditems = [];
            if (m.groupId && this.state.showGroups) {
              const group = this.state.guests
                            .filter(n => n._id !== m._id && n.groupId === m.groupId)
                            .map(i => {
                                return (<span key={`${i.firstName}-${i._id}`}>{`${i.firstName} ${i.lastName}`}<br/></span>)
                            });
              nesteditems = <p>{group}</p>
              att.secondaryText = {
                secondaryText: nesteditems,
                secondaryTextLines: group.length
              };
            }
            return <ListItem {...att} />
          })}
        </List>
      </div>
      );
  }

  renderGuestProfile() {
    if (!this.state.selected) {
      return <div className="col-7">Please selected a guest to see their profile.</div>;
    }

    const {firstName, lastName, rsvp, diet, message} = this.state.selected;

    return (
      <div className="col-7" style={{textAlign: 'center', padding: '20px'}}>
        <div><SocialPerson style={{width: '150', height: '150'}}/></div>
        <h2 className="name">{`${firstName} ${lastName}`}</h2>
        <h3>{`RSVP: ${rsvp === 'yes' ? 'yes': rsvp === 'no' ? 'no' : 'No status yet'}`}</h3>
        <h3>{`Dietary Requirements: ${diet ? diet : 'No requirements provided'}`}</h3>
        <h3>{`Message: ${message ? message : 'No message provided'}`}</h3>
      </div>
    );
  }

  render() {
    return (
      <div>
        <GuestAdd/>
        { this.renderGuestsContainer() }
      </div>
    );
  }
}

const mapStateToProps = ({Guests}) => {
  console.log('mapstatetoprops', Guests);
  return {
    filtered: Guests.all,
    guests: Guests.all,
    selected: Guests.selected
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({FetchGuests, LinkGuests}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestsList);