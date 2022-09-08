const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  country: { // страна создания фильма
    type: String,
    required: true,
  },
  director: { // режиссёр фильма
    type: String,
    required: true,
  },
  duration: { // длительность фильма
    type: Number,
    required: true,
  },
  year: { // год выпуска фильма
    type: String,
    required: true,
  },
  description: { // описание фильма
    type: String,
    required: true,
  },
  image: { // ссылка на постер к фильму URL-адрес
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  trailerLink: { // ссылка на трейлер фильма URL-адрес
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
    },
  },
  thumbnail: { // миниатюрное изображение постера к фильму URL-адрес
    type: String,
    required: true,
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
    required: true,
  },
  nameEN: { // название фильма на английском языке
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('movie', userSchema);
