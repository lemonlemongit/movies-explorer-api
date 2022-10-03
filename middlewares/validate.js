const validator = require('validator');

const validateURL = (url) => {
  if (!validator.isURL(url, { require_protocol: true })) {
    throw new Error('Нужно ввести ссылку.');
  }
  return url;
};

module.exports = { validateURL };
