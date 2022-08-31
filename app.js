const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const routUsers = require('./routes/users');
const routMovies = require('./routes/movies');

const { PORT = 3001 } = process.env;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use('/users', routUsers);
app.use('/movies', routMovies);

app.listen(PORT);
