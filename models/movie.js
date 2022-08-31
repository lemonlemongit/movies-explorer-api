const mongoose = require('mongoose');
const validator = require('validator');

const moviesSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    requare: true,
  },
  director: { // режиссёр фильма
    type: String,
    requare: true,
  },
  duration: { // длительность фильма
    type: Number,
    requare: true,
  },
  year: { // год выпуска фильма
    type: String,
    requare: true,
  },
  description: { // описание фильма
    type: String,
    requare: true,
  },
  image: { // ссылка на постер к фильму URL-адрес
    type: String,
    requare: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  trailerLink: { // ссылка на трейлер фильма URL-адрес
    type: String,
    requare: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  thumbnail: { // миниатюрное изображение постера к фильму URL-адрес
    type: String,
    requare: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  owner: { // _id пользователя, который сохранил фильм
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: { // id фильма, который содержится в ответе сервиса MoviesExplorer
    type: Number,
    required: true,
  },
  nameRU: { // название фильма на русском языке
    type: String,
    requare: true,
  },
  nameEN: { // название фильма на английском языке
    type: String,
    requare: true,
  },

});

module.exports = mongoose.model('movie', moviesSchema);
