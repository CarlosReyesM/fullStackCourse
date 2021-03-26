import React from 'react';
import Part from './Part';

const Content = ({course}) => {
  console.log(course);
  return (
    <div>
      {course.parts.map(p => <Part key={p.id} part={p} />)}
    </div>
  )
}

export default Content
