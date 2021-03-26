import React from 'react';

const Total = ({ course }) => {
  const sum = course.parts.reduce((a, b) => {
    a += b.exercises;
    return a
  }, 0);
  return <p><b>Number of exercises {sum}</b></p>;
};

export default Total;
