const rateLimit = require('express-rate-limit');

module.exports = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 мин
  max: 110, // Лимит в 30 попыток за 15 мин
});
