const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { validateURL } = require('../middlewares/validate');
const {
  getMovies,
  createMovies,
  deleteMovies,
} = require('../controllers/movies');

// возвращает все сохранённые текущим  пользователем фильмы
router.get('/', getMovies);

// создаёт фильм с переданными в теле):
// country, director, duration, year
// description, image, trailer, nameRU, nameEN и thumbnail, movieId
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().integer(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().required().custom(validateURL),
      trailerLink: Joi.string().required().custom(validateURL),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      thumbnail: Joi.string().required().custom(validateURL),
      movieId: Joi.number().integer(),
    }),
  }),
  createMovies,
);

// удаляет сохранённый фильм по id
router.delete(
  '/:movieId',
  celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().required().hex().length(24),
    }),
  }),
  deleteMovies,
);

module.exports = router;
