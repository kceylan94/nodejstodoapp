var bodyParser =require('body-parser');
var mongoose = require('mongoose');

//Connect database
mongoose.connect(
    "mongodb://KJaytest1:KJaytest1@ds147390.mlab.com:47390/todo",
    { useNewUrlParser: true }
);

//Create a schema
var todoSchema = new mongoose.Schema({
   item: String
});

var Todo = mongoose.model('Todo', todoSchema);


//var data = [{item: 'Get milk'}, {item: 'Walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {

app.get('/todo', function(req,res) {
    //get data from mongodb and pass it to view
    Todo.find({}, function (err, data) {
        if (err) throw err;
        res.render('todo', {todos: data});
    });
});

app.post('/todo', urlencodedParser, function (req,res) {
    //get data from the view and add it to mongodb
    var newTodo = Todo(req.body).save(function (err, data) {
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