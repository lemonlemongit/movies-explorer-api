const mongo = 'mongodb://localhost:27017/bitfilmsdb';
module.exports.MONGO_DB = process.env.MONGO_DB || mongo;
