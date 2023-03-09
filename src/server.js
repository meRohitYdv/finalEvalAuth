const express = require('express');
const auth = require('./routes/auth.js');
const cors = require('cors');
const redis = require('redis');

const app = express();
const port = 8080;

app.use(express.json());
var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));

const config = {
  socket: {
    host: 'localhost',
    port: 6379
}
}
global.redisClient = redis.createClient(config);

redisClient
.on('error', err => {
  console.log('Error   -> ' + err);
})
.connect().then(() => {
  console.log('redis connected');
});

app.use('/',auth);

app.listen(port, () =>
  console.log(`Auth service listening at http://localhost:${port}`)
);