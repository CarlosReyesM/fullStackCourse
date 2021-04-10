import axios from 'axios';

const url = 'http://localhost:3001/api/persons';

const getPersons = () => {
  const response = axios.get(url);

  return response.then((res) => res.data);
};

const setPerson = (person) => {
  const response = axios.post(url, person);
  return response.then((res) => res.data);
};

const deletePerson = (id) => {
  const response = axios.delete(`${url}/${id}`);
  return response.then((res) => res.data);
};

const replaceNumber = (changePerson) => {
  const response = axios.put(`${url}/${changePerson.id}`, changePerson);
  return response.then(res => res.data);
}

const backend = {
  getPersons,
  setPerson,
  deletePerson,
  replaceNumber,
};

export default backend;
