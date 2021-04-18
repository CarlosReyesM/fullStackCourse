require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/person');

const app = express();

app.use(express.static('build'));
app.use(express.json());
app.use(cors());

morgan.token('post', (req, res) => JSON.stringify(req.body));

app.use(
  morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'),
      '-',
      tokens['response-time'](req, res),
      'ms',
      tokens.post(req, res),
    ].join(' ');
  }),
);

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

app.get('/', (request, response) => {
  const today = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${today}</p>`,
  );
});

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then((p) => response.json(p))
    .catch((e) => console.log(e));
});

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.findById(id).then(p => {
    if (!p) {
      return response.status(404).end();
    }
    return response.json(p)
  }).catch(e => {
    next(e)
  });
});

app.post('/api/persons', (request, response) => {
  const { body } = request;
  console.log(body);
  if (body.name === undefined) {
    return response.status(400).json('name missing');
  }

  Person.find({ name: body.name }).then(p => {
    if (p.length) {
      return response.status(400).json('name must be unique').end();
    }
    const person = new Person({
      name: body.name,
      number: body.number,
    });

    person.save().then(savedPerson => response.json(savedPerson));
  }).catch(e => next(e));
});

app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id;

  const { body } = request;
  const changePerson = {
    number: body.number,
  }
  Person.findByIdAndUpdate(id, changePerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(e => next(e))
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  Person.findByIdAndRemove(id)
    .then(() => response.status(204).end())
    .catch(e => next(e))

});

const unknownEndpoint = (_request, response) => response.status(404).send({ error: 'unknown endpoint' })

app.use(unknownEndpoint);

const errorHandler = (error, _request, response, next) => {
  console.log(error);
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
