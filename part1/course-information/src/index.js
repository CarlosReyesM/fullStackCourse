import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({course}) => <h1>{course.name}</h1>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({course}) =>{ 
  const parts = course.parts.map(c => <Part key={c.name} part={c} />)
  return parts;
};

const Total = ({course}) => {
  const total = course.parts.reduce((a, b) => {return  a+= b.exercises}, 0)
  return <p>
    Number of exercises {total}
  </p>
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content
        course={course}
      />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));