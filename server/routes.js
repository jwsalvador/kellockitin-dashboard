const path = require('path');

const Guests = require('./controller/Guests');

const RoutesConfig = (app) => {

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // restrict it to the required domain
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    // Set custom headers for CORS
    res.header("Access-Control-Allow-Headers", "Content-type,Accept,X-Custom-Header");
    next();
  });
  
  app.get('/api/guests', Guests.Get);
  app.post('/api/guest', Guests.Find);
  app.post('/api/guest/rsvp', Guests.Rsvp);
  app.post('/api/guests', Guests.Save);
  app.post('/api/guests/link', Guests.Link);
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });
};

module.exports = RoutesConfig;