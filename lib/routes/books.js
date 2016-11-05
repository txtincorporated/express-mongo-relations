const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser').json();

const Book = require('../models/book');

router
    .get('/', (req, res, next) => {
      const query = {};
      //allow client to send a query string using `?`
      if(req.query.title) query.title = req.query.title; 
      if(req.query.author) query.author = req.query.author; 
      if(req.query._id) query._id = req.query._id; 

      Book.find(query)
        .then(books => res.send(books))
        .catch((err) => {
          console.log('Book error (GET): ', err);
          next(err);
        });
    })
    .post('/', bodyParser, (req, res, next)=> {
      console.log('Calling books.post... ');

      new Book(req.body).save()
        .then(book => res.send(book))
        .catch((err) => {
          console.log('Book error (POST): ', err);
          next(err);
        }); 
    })
    .get('/:id', (req, res, next) => {
      Book.findById(req.params.id)
        .then(book => res.send(book))
        .catch(next);
    })
    .put('/:id', bodyParser, (req, res, next) => {
      console.log('Calling books.put...  ');
      console.log(req.params.id);
      Book.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(saved => res.send(saved))
        .catch(next);
    })
    .delete('/:id', (req, res, next) => {
      console.log('Calling books.del...');
      console.log('To delete: ', req.params.id);
      Book.findByIdAndRemove(req.params.id)
        .then(deleted => res.send(deleted))
        .catch(next);
    });

module.exports = router;
