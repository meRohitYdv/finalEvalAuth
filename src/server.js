const express = require('express');
const auth = require('./routes/auth.js');

const app = express();
const port = 8080;
app.use(express.json());

app.use('/',auth);
app.listen(port, () =>
  console.log(`Auth service listening at http://localhost:${port}`)
);