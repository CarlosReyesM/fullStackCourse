require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Person = require('./models/person')

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

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
      return response.status(400).end();
    }
    return response.json(p)
  }).catch(e => console.log(e));
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
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
  }).catch(e => console.log(e));
});

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
