var bodyParser =require('body-parser');
var mongoose = require('mongoose');

// Connect database
mongoose.connect(
  process.env.MONGODB_CONNECTION_STRING,
  { useNewUrlParser: true }
);

//Create a schema
var todoSchema = new mongoose.Schema({
  item: String
});

// Use the schema
var Todo = mongoose.model('Todo', todoSchema);

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

  app.get('/', function(req,res) {
    //get data from mongodb and pass it to view
    Todo.find({}, function (err, data) {
      if (err) throw err;
      res.render('todo', {todos: data});
    });
  });

  app.post('/todo', urlencodedParser, function (req,res) {
    //get data from the view and add it to mongodb
    Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function (req,res) {
    //delete requested data from mongodb
    Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });

};
