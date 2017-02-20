import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import TextField from 'material-ui/TextField';


import {List} from 'material-ui/List';
import GuestAdd from './GuestAdd';
import ListItem from 'components/ListItem';
import FlatButton from 'material-ui/FlatButton';

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
      mainLink: ''
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleAddGuestGroup = this.handleAddGuestGroup.bind(this);
    this.handleCancelGuestGroup = this.handleCancelGuestGroup.bind(this);
    this.handleLinkGuests = this.handleLinkGuests.bind(this);
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
      <div style={{width: '30%'}}>
        <TextField onChange={this.handleSearch} floatingLabelText="Search"/>
        { this.state.showCheckbox && this.renderLinkGuests() }
        <List>
          {this.state.guests.filter(m => m._id !== this.state.mainLink).map(m => {
            return <ListItem 
              key={m._id} 
              id={m._id}
              primaryText={`${m.firstName} ${m.lastName}`}
              onCheckHandler={this.toggleCheckbox}
              showCheckbox={this.state.showCheckbox}
              handleAddGuestGroup={this.handleAddGuestGroup}
              />
          })}
        </List>
      </div>
      );
  }

  renderGuestProfile() {
    return (<div style={{width: '70%'}}>This is the profile</div>);
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