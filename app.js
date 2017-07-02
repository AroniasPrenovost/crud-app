var express = require('express');
var app = express();
var bodyParser = require ('body-parser');
var mongoose = require('mongoose');
mongoose.Promise = global.Promise; // satisfies promise requirement error message
var Book = require('./Book.model');
var port = 8080;
var db = 'mongodb://localhost/example';


mongoose.connect(db);

// parse json and url data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
	extended: true
}));

// add routes for db retrieval 
app.get('/', function(req, res) {
	res.send('Hey there');
});

app.get('/books', function(req, res) {
  console.log('getting all books');
  Book.find({})
    .exec(function(err, books) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

app.get('/books/:id', function(req, res) {
  console.log('getting all books');
  Book.findOne({
    _id: req.params.id
    })
    .exec(function(err, books) {
      if(err) {
        res.send('error occured')
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

// the first way to post to a route 
app.post('/book', function(req, res) {
  var newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.categor

  newBook.save(function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

// the other way to post to a route
// is to pass in request.body
app.post('/book2', function(req, res) {
  Book.create(req.body, function(err, book) {
    if(err) {
      res.send('error saving book');
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.put('/book/:id', function(req, res) {
  Book.findOneAndUpdate({
    _id: req.params.id
    },
    { $set: 
    { title: req.body.title }}, 
    {upsert: true}, function(err, newBook) {
    if (err) {
      res.send('error updating ');
    } else {
      console.log(newBook);
      res.send(newBook);
    }
  });
});

app.delete('/book/:id', function(req, res) {
  Book.findOneAndRemove({
    _id: req.params.id
  }, function(err, book) {
    if(err) {
      res.send('error deleting');
    } else {
      console.log(book);
      res.status(204);
    }
  });
});


app.listen(port, function() {
	console.log('app listen on port' + port);
});
