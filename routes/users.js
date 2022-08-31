const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const {
  getUserInfo,
  updateUser,
} = require('../controllers/users');

// возвращает информацию о пользователе (email и имя)
router.get('/me', getUserInfo);

// обновляет информацию о пользователе (email и имя)
router.patch('/me', updateUser);

module.exports = router;
