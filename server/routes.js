const path = require('path');

const Guests = require('./controller/Guest');

const RoutesConfig = (app) => {
  
  app.get('/api/guests', Guests.Get);
  app.post('/api/guests', Guests.Save);
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });
};

module.exports = RoutesConfig;