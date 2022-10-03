const Movie = require('../models/movie');
const BadRequest = require('../errors/error400');
const NotFound = require('../errors/error404');
const Forbidden = require('../errors/error403');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(next);
};

module.exports.createMovies = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
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
  const owner = req.user._id;
  const { movieId } = req.params;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound({ message: 'Переданы некорректные данные.' });
      }
      if (movie.owner.toString() !== owner) {
        throw new Forbidden({ message: 'Переданы некорректные данные.' });
      } else {
        Movie.findByIdAndDelete(movieId)
          .then((deletedMovie) => {
            res.status(200).send(deletedMovie);
          })
          .catch((error) => {
            if (error.name === 'CastError') {
              throw new NotFound({ message: 'Переданы некорректные данные.' });
            }
            next(error);
          })
          .catch(next);
      }
    })
    .catch(next);
};
