const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFound = require('../errors/error404');
const BadRequest = require('../errors/error400');
const ConflictingRequest = require('../errors/error409');
const Unauthorized = require('../errors/error401');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    // .then((({ _id }) => User.findById(_id)))
    .then((user) => res.status(201).send({ name: user.name, email: user.email }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Вы ввели некорректные данные'));
        return;
      } if (err.code === 11000) {
        next(new ConflictingRequest('Введите другой email'));
        return;
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({
        _id: user._id,
      }, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(() => {
      next(new Unauthorized('Не удалось авторизоваться'));
    });
};

module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFound('Не верный Пароль или Email')); // Такого пользователя нет
      } else {
        res.send(user);
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        next(new BadRequest('Невалидный id'));
      } else {
        next(error);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        throw new NotFound('Пользователь не найден');
      }
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest('Переданы некорректные данные'));
        return;
      } if (err.code === 11000) {
        next(new ConflictingRequest('Некорректные данные'));
      }
      next(err);
    });
};
