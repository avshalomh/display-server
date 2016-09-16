const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let monitorsSchema = new Schema({
  //very very very crude json mechanism, too lazy for anything else
  monitors: Object
});

module.exports = mongoose.model('monis', monitorsSchema);