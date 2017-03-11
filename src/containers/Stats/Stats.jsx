import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Tabs, Tab} from 'material-ui/Tabs';
import {List, ListItem} from 'material-ui/List';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  name: {
    textTransform: 'capitalize',
    fontWeight: 600    
  },
  main: {
    textTransform: 'capitalize',
    display: 'inline-block',
    width: '50%',
  },
  secondary: {
    width: '50%',
    display: 'inline-block'
} 
};

class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 'y',
      list: this.props.guests.filter(n => n.rsvp === 'y')
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (value) {
    const filterGuests = (m) => {
      switch (m) {
        case 'y':
          return this.props.guests.filter(n => n.rsvp === 'y');
        case 'n':
          return this.props.guests.filter(n => n.rsvp === 'n');
        case 'd':
          return this.props.guests.filter(n => n.diet);
        case 'm':
          return this.props.guests.filter(n => n.message);
        default:
          return this.props.guests.filter(n => !n.rsvp);
      }
    };

    this.setState({
      value: value,
      list: filterGuests(value)
    });
  };

  showSecondaryText(guest) {
    switch (this.state.value) {
      case 'd':
        return guest.diet;
      case 'm':
        return guest.message;
      default:
        return '';
    }
  }

  renderFilteredList() {
    return this.state.list.map(m => {
      return (
        <ListItem 
          key={m._id} 
          style={styles.name} 
          primaryText={`${m.firstName} ${m.lastName}`}
          insetChildren={true}
          secondaryText={this.showSecondaryText(m)} />
      )
    });
  }

  render() {
    return (
      <div>
        <Tabs value={this.state.value} onChange={this.handleChange}>
          <Tab label="Going" value="y">
            <div>
              <h2 style={styles.headline}>Going</h2>
              <List>
                {this.renderFilteredList()}
              </List>
            </div>
          </Tab>
          <Tab label="Not Going" value="n">
            <div>
              <h2 style={styles.headline}>Not going</h2>
              <List>
                {this.renderFilteredList()}
              </List>
            </div>
          </Tab>
          <Tab label="No Status" value="">
            <div>
              <h2 style={styles.headline}>No RSVP status yet</h2>
              <List>
                {this.renderFilteredList()}
              </List>
            </div>
          </Tab>
          <Tab label="Dietary Requirements" value="d">
            <div>
              <h2 style={styles.headline}>Dietary Requirements</h2>
              <List>
                {this.renderFilteredList()}
              </List>
            </div>
          </Tab>
          <Tab label="Messages" value="m">
            <div>
              <h2 style={styles.headline}>Messages</h2>
              <List>
                {this.state.list.map(m => {
                  return (
                    <div key={m._id} className="stats-messages__list" style={{padding: '20px 40px'}}>
                      <div style={styles.main}>
                        {`${m.firstName} ${m.lastName}`}
                      </div>
                      <div style={styles.secondary}>
                        {this.showSecondaryText(m)}
                      </div>
                    </div>
                  )
                })}
              </List>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    guests: state.Guests.all
  }
}

export default connect(mapStateToProps)(Stats);