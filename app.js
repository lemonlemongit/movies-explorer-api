require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const limiter = require('./utils/rateLimit');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const serverError = require('./middlewares/server-error');
const { MONGO_DB } = require('./utils/config');

const { PORT = 3003 } = process.env;
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(MONGO_DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(requestLogger);
app.use(limiter);
app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(serverError);

app.listen(PORT);
