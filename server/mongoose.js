const mongoose = require('mongoose');
const config = require('./config');
mongoose.Promise = global.Promise;
mongoose.connect(config.mongo.url).then(() => {
  console.log('Connected to mongoDB');
});

module.exports = {
  mongoose: mongoose
};