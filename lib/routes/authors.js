const express = require('express');
const router = express.Router();

const bodyParser = require('body-parser').json();

const Author = require('../models/author');

router
    .get('/', (req, res, next) => {
      console.log('Author GET route...');
      const query = {};

      if(req.query.name) query.name = req.query.name;
      // support sending a nav bar query using `?`
      if(req.query.centuries) query.period = req.query.altname;
      if(req.query._id) query._id = req.query._id;

      Author.find(query)
        .then(authors => res.send(authors))
        .catch((err) => {
          console.log('Author error (GET) ', err);
          next(err);
        });
    })
    .post('/', bodyParser, (req, res, next)  => {
      console.log('Calling authors.post... ');

      new Author(req.body).save()
        .then(author => res.send(author))
        .catch((err) => {
          console.log('Author error (POST):  ', err);
          next(err);
        });
    })
    .get('/:id', (req, res, next) => {
      Author.findById(req.params.id)
        .then(author => res.send(author))
        .catch(next);
    })
    .put('/:id', bodyParser, (req, res, next) => {
      console.log('Calling authors.put...');
      console.log(req.params.id);
      Author.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(saved => res.send(saved))
        .catch(next);
    })
    .delete('/:id', (req, res, next) => {
      console.log('Calling authors.del...');
      Author.findByIdAndRemove(req.params.id)
        .then(deleted => res.send(deleted))
        .catch(next);
    });

module.exports = router;