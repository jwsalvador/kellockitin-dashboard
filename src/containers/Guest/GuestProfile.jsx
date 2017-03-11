import React from 'react';

import SocialPerson from 'material-ui/svg-icons/social/person';

const Profile = ({selected}) => {
  if (!selected) {
    return <div className="col-7">Please selected a guest to see their profile.</div>;
  }

  const {firstName, lastName, rsvp, diet, message} = selected;
  return (
    <div className="col-7" style={{textAlign: 'center', padding: '20px'}}>
      <div><SocialPerson style={{width: 150, height: 150}}/></div>
      <h2 className="name">{`${firstName} ${lastName}`}</h2>
      <h3>{`RSVP: ${rsvp === 'y' ? 'yes': rsvp === 'n' ? 'no' : 'No status yet'}`}</h3>
      <h3>{`Dietary Requirements: ${diet ? diet : 'No requirements provided'}`}</h3>
      <h3>{`Message: ${message ? message : 'No message provided'}`}</h3>
    </div>
  );
};

export default Profile;