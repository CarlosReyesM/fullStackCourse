import React from 'react';

const PersonsList = ({ persons, handleDelete }) => {
  return (
    <>
      {persons.map((p) => {
        const onHandleDelete = () => {
          handleDelete(p.id);
        };
        return (
          <React.Fragment key={p.id}>
            <p>
              name: {p.name} <br /> number: {p.number}
            </p>
            <button onClick={onHandleDelete}>Delete</button>
          </React.Fragment>
        );
      })}
    </>
  );
};

export default PersonsList;
