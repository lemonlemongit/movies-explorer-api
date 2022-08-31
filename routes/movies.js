const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

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
router.post('/', createMovies);

// удаляет сохранённый фильм по id
router.delete('/:movieId', deleteMovies);

module.exports = router;
