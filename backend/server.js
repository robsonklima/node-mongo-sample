var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Customer = require('./models/customer'),
    bodyParser = require('body-parser'),
    cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/database', { useMongoClient: true }).then().catch();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/Customers', (req, res) => {
  Customer.find({}, function (err, r) {
    if (err)
      res.send(err);
    res.json(r);
  });
});

app.post('/Customers', (req, res) => {
  var customer = new Customer(req.body);
  customer.save(function(err, r) {
    if (err)
      res.send(err);
    res.json(r);
  });
});

app.get('/Customers/:customerId', (req, res) => {
  Customer.findById(req.params.customerId, function (err, r) {
    if (err)
      res.send(err);
    res.json(r);
  });
});

app.put('/Customers/:customerId', (req, res) => {
  Customer.findOneAndUpdate({ _id: req.params.customerId }, req.body, { new: true }, function (err, r) {
    if (err)
      res.send(err);
    res.json(r);
  });
});

app.delete('/Customers/:customerId', (req, res) => {
  Customer.remove({
    _id: req.params.customerId
  }, function (err, r) {
    if (err)
      res.send(err);
    res.json({ message: 'Customer successfully deleted' });
  });
});

app.listen(port);

console.log('API server started on port: ' + port);