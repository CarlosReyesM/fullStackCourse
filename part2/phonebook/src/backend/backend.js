import axios from 'axios';

const url = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_BE : process.env.REACT_APP_LOCAL_BE;
console.log(url);

const getPersons = () => {
  const response = axios.get(`${url}/api/persons`);

  return response.then((res) => res.data);
};

const setPerson = (person) => {
  const response = axios.post(`${url}/api/persons`, person);
  return response.then((res) => res.data);
};

const deletePerson = (id) => {
  const response = axios.delete(`${url}/api/persons/${id}`);
  return response.then((res) => res.data);
};

const replaceNumber = (changePerson) => {
  const response = axios.put(`${url}/api/persons/${changePerson.id}`, changePerson);
  return response.then(res => res.data);
}

const backend = {
  getPersons,
  setPerson,
  deletePerson,
  replaceNumber,
};

export default backend;
