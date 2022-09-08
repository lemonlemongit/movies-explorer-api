const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { login, createUser } = require('../controllers/users');
const routUsers = require('./users');
const routMovies = require('./movies');
const auth = require('../middlewares/auth');
const NotFound = require('../errors/error404');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30).required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  createUser,
);

router.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
  login,
);

router.use(auth);

router.use('/users', routUsers);
router.use('/movies', routMovies);

router.use('*', (req, res, next) => {
  next(new NotFound('Такого роута не сущесвтует. 404'));
});

module.exports = router;
