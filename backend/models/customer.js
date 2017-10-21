var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
  firstName: {
    type: String,
    required: 'PLease enter the name of the client'
  },
  lastName: {
    type: String,
    required: 'Please enter the last name of the client'
  }
});

module.exports = mongoose.model('Customers', CustomerSchema);