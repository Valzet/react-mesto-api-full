const express = require('express');

const app = express();
const mongoose = require('mongoose');

const { PORT = 3001 } = process.env;
const bodyParser = require('body-parser');
const helmet = require('helmet');
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const NotFoundError = require('./errors/not-found-err');

// const options = {
//   origin: [
//     'http://localhost:3000',
//     'http://mesto-foreve.students.nomoredomains.sbs',
//     'https://github.com/Valzet',
//   ],
//   credentials: true,
// };

app.use(cookieParser());
mongoose.connect('mongodb://localhost:27017/mestodb');
app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-.~:/?#[\]@!$&'()*+,;=]{2,}#?$/),
  }),
}), createUser);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res, next) => next(new NotFoundError('Такой страницы не существует.')));

app.use(errorLogger);
app.use(errors());
// eslint-disable-next-line consistent-return
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({ message: statusCode === 500 ? 'Ошибка на стороне сервера' : message });
  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
