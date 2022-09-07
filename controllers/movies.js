const Movie = require('../models/movie');
const BadRequest = require('../errors/error400');
const NotFound = require('../errors/error404');
const Forbidden = require('../errors/error403');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ })
    .then((film) => res.send(film))
    .catch(next);
};

module.exports.createMovies = (req, res, next) => {
  const owner = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU, nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest({ message: 'Переданы некорректные данные.' }));
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovies = (req, res, next) => {
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((film) => {
      if (!film) {
        throw new NotFound('Не найдено.');
      } if (film.owner.toString() !== req.user._id) {
        throw new Forbidden('Можно удалять только cвои фильмы!');
      }
      Movie.findByIdAndRemove(movieId)
        .then(() => res.status(200).send({ message: 'Фильм удалён.' }))
        .catch(next);
    })
    .catch(next);
};
