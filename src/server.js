const express = require('express');
const auth = require('./routes/auth.js');
const cors = require('cors');

const app = express();
const port = 8080;

app.use(express.json());
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

app.use('/',auth);

app.listen(port, () =>
  console.log(`Auth service listening at http://localhost:${port}`)
);