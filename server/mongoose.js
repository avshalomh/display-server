const mongoose = require('mongoose');
const config = require('./config');
mongoose.Promise = global.Promise;

mongoose.connect(config.mongo.url, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true }).then(() => {
  console.log('Connected to mongoDB');
});

module.exports = {
  mongoose: mongoose
};
