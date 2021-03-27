import React from 'react';

const PersonsList = ({ persons }) => {
  return (
    <>
      {persons.map((p) => (
        <p key={p.id}>
          name: {p.name} <br /> number: {p.number}
        </p>
      ))}
    </>
  );
};

export default PersonsList;
