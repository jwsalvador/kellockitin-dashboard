const path = require('path');

const Guests = require('./controller/Guests');

const RoutesConfig = (app) => {
  
  app.get('/api/guests', Guests.Get);
  app.post('/api/guest', Guests.Find);
  app.post('/api/guests', Guests.Save);
  app.post('/api/guests/link', Guests.Link);
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });
};

module.exports = RoutesConfig;