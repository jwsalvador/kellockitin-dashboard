const server = require('./server');

const app = server.Run();

const port = process.env.PORT || 3001;

app.listen(port);