import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import TextField from 'material-ui/TextField';

import Toggle from 'material-ui/Toggle';
import {List} from 'material-ui/List';
import ListItem from 'components/ListItem';
import FlatButton from 'material-ui/FlatButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import GuestProfile from 'containers/Guest/GuestProfile';
import GuestAdd from 'containers/Guest/GuestAdd';
import Notification from 'components/Notification';


import {FetchGuests, LinkGuests, DeleteGuest} from 'ducks/modules/Guests';

class GuestsList extends Component {
  constructor(props) {
    super(props);
    this.props.FetchGuests();    

    this.selectedCheckboxes = new Set();
  }

  componentWillMount() {
    this.state = {
      guests: this.props.guests,
      search: '',
      showCheckbox: false,
      mainLink: '',
      linkId: '',
      selected: null,
      showGroups: false,
      linkNotification: false,
      guestAddNotification: false,
      openDialog: false
    }

    this.handleSearch = this.handleSearch.bind(this);
    this.toggleCheckbox = this.toggleCheckbox.bind(this);
    this.handleAddGuestGroup = this.handleAddGuestGroup.bind(this);
    this.handleCancelGuestGroup = this.handleCancelGuestGroup.bind(this);
    this.handleLinkGuests = this.handleLinkGuests.bind(this);
    this.handleDeleteGuest = this.handleDeleteGuest.bind(this);
    this.handleShowProfile = this.handleShowProfile.bind(this);
    this.toggleShowGroups = this.toggleShowGroups.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleOpenDialog = this.handleOpenDialog.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({guests: nextProps.guests});
  }

  handleOpenDialog() {
    this.setState({openDialog: true});
  };

  handleCloseDialog() {
    this.setState({openDialog: false});    
  }

  handleAddGuestGroup(e, id) {
    const link = this.state.guests.find(m => m._id === id);
    const linkId = link.groupId || link._id;
    let set = new Set();
    this.setState({showCheckbox:true, mainLink: id, linkId});
    this.selectedCheckboxes = new Set();
    this.state.guests.forEach((m) => {m.groupId === linkId && this.selectedCheckboxes.add(m._id)});
    // add default id if group not found
    this.selectedCheckboxes.size === 0 && this.selectedCheckboxes.add(id);
    console.log(this.selectedCheckboxes);
    
  }

  handleDeleteGuest(e, id) {
    this.props.DeleteGuest(id);
  }

  handleCancelGuestGroup() {
    this.selectedCheckboxes = new Set();
    this.setState({showCheckbox: false, mainLink: ''});
  }

  handleRequestClose(state) {
    this.setState({[state]: false});
  }

  handleSearch(e, value) {
    this.setState({
      search: value,
      guests: value ? 
        this.props.guests
          .filter((g) => (`${g.firstName.toLowerCase()} ${g.lastName.toLowerCase()}`).indexOf(value.toLowerCase()) > -1) : 
        this.props.guests
    })
  }

  handleLinkGuests() {
    this.props.LinkGuests([...this.selectedCheckboxes]);
    this.setState({showCheckbox: false, mainLink: ''});    
    this.setState({linkNotification: true});
    this.selectedCheckboxes = new Set();
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
      handleDeleteGuest: this.handleDeleteGuest,
      onClick: this.handleShowProfile,
      checked: this.state.mainLink ? this.state.linkId === guest.groupId : false
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
          <Toggle label="Show group" labelPosition="right" labelStyle={{fontSize: 11}} onToggle={this.toggleShowGroups}/>
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
    return <GuestProfile selected={this.state.selected}/>;
  }

  render() {
    const style = {position: 'absolute', right: '30px', top: '-30px'};

    return (
      <div>
        <FloatingActionButton secondary={true} style={style} onClick={this.handleOpenDialog}>
          <ContentAdd />
        </FloatingActionButton>
        <GuestAdd open={this.state.openDialog} close={this.handleCloseDialog}/>
        { this.renderGuestsContainer() }
        <Notification
          open={this.state.linkNotification}
          message="Guests linked"
          handleClose={() => this.handleRequestClose('linkNotification')}
        />
        <Notification
          open={this.state.guestAddNotification}
          message="Guest added"
          handleClose={() => this.handleRequestClose('guestAddNotification')}
        />
      </div>
    );
  }
}

const mapStateToProps = ({Guests}) => {
  return {
    filtered: Guests.all,
    guests: Guests.all,
    selected: Guests.selected
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({FetchGuests, LinkGuests, DeleteGuest}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestsList);