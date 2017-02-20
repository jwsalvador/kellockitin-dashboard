import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import TextField from 'material-ui/TextField';


import {List} from 'material-ui/List';
import GuestAdd from './GuestAdd';
import ListItem from 'components/ListItem';

import {FetchGuests} from 'ducks/modules/Guests';

class GuestsList extends Component {
  constructor(props) {
    super(props);
    this.props.FetchGuests();    

    this.selectedCheckboxes = new Set();
  }

  componentWillMount() {
    console.log(this.props.guests)
    this.state = {
      guests: this.props.guests,
      search: '',
      showCheckbox: false
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleAddGuest = this.handleAddGuest.bind(this);
  }

  componentWillReceiveProps() {
    this.setState({guests: this.props.guests});
  }

  handleAddGuest() {
    console.log('add guest')
    this.setState({showCheckbox:true});
  }

  handleSearch(e, value) {
    this.setState({
      search: value,
      guests: value ? 
        this.props.guests.filter((g) => (`${g.firstName.toLowerCase()} ${g.lastName.toLowerCase()}`).indexOf(value.toLowerCase()) > -1) : 
        this.props.guests
    })
  }

  toggleCheckbox(e, isChecked) {
    if (isChecked) {
      console.log(e.target.attributes.data.value);
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

  renderGuestsList() {
    return (
      <div style={{width: '30%'}}>
        <TextField onChange={this.handleSearch} floatingLabelText="Search"/>
        <List>
          {this.state.guests.map(m => {
            return <ListItem 
              key={m._id} 
              id={m._id}
              primaryText={`${m.firstName} ${m.lastName}`}
              onCheckHandler={this.toggleCheckbox}
              showCheckbox={this.state.showCheckbox}
              handleAddGuest={this.handleAddGuest}
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
  console.log(Guests)
  return {
    filtered: Guests.all,
    guests: Guests.all,
    selected: Guests.selected
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({FetchGuests}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestsList);