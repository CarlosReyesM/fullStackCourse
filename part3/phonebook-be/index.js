const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

morgan.token('post', (req, res) => JSON.stringify(req.body) )

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

const generateID = () => Math.floor(Math.random() * 99999999);

app.get('/', (request, response) => {
  const today = new Date();
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${today}</p>`,
  );
});

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (!person) {
    return response.status(400).end();
  }
  return response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  console.log(body);
  const notUniqueName = persons.find((p) => p.name === body.name);

  if (notUniqueName) {
    return response.status(400).json('name must be unique');
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID(),
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
