const mongoose = require('mongoose');
const config = require('./config');
mongoose.Promise = global.Promise;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.connect(config.mongo.url, { }).then(() => {
  console.log('Connected to mongoDB');
});

module.exports = {
  mongoose: mongoose
};
